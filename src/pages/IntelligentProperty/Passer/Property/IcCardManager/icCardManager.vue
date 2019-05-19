<template>
  <div class="rscont" id="icCardManager">
    <div class="main-cont">
      <div class="pt50">
        <div class="top-title font14" style="text-align:left;">
          <div class="line"></div>
          <span class="top-text">IC卡管理</span>
        </div>
        <div class="main-box">
          <div class="forms-cont clearfix">
            <div class="form-item fl">
              <el-input v-model.trim="searchIcCardParams.ICCardNum" placeholder="IC卡号" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-input v-model.trim="searchIcCardParams.companyName" placeholder="公司名称" clearable></el-input>
            </div>
            <div class="form-item fl">
              <el-button type="primary" @click="handleSearchIcCard">查询</el-button>
            </div>
            <div class="form-item fr">
            </div>
          </div>
          <div class="clear20"></div>
          <div class="tables">
            <el-table :data="icCardInfo.icCardList" style="width: 100%"
                      @selection-change="handleSelectionChange"  :empty-text=text>
              <el-table-column fixed type="selection"></el-table-column>
              <el-table-column type="index" width="50" label="编号" :index="indexMethod"></el-table-column>
              <el-table-column prop="name" label="姓名" width="90"></el-table-column>
              <el-table-column prop="telphone" label="手机号" width="90"></el-table-column>
              <el-table-column prop="idCode" label="身份证号" width="90"></el-table-column>
              <el-table-column prop="ICCardCod" width="100" label="卡号"></el-table-column>
              <el-table-column prop="buildingList" label="写字楼"></el-table-column>
              <el-table-column prop="wordComapanyNameList" label="公司名称"></el-table-column>
              <el-table-column prop="visitCompanyNameList" label="拜访公司名称"></el-table-column>
              <el-table-column fixed="right" label="操作" width="240">
                <template slot-scope="scope">
                  <el-button type="primary" size="small"  @click="handleEditIcCardShow(scope.row)">编辑</el-button>
                  <el-button type="primary" size="small" @click="handleDeleteSignalIcCardShow(scope.row,'N')">删除</el-button>
                  <el-button type="danger" size="small" @click="handleDeleteSignalIcCardShow(scope.row,'F')" v-if="scope.row.statusId=='1'">冻结</el-button>
                  <el-button type="success" size="small" @click="handleDeleteSignalIcCardShow(scope.row,'Y')" v-if="scope.row.statusId=='3'">激活</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clear20"></div>
          <div class="clearfix">
            <div class="pages fl">
              <el-pagination background layout="prev, pager, next" :page-count="icCardInfo.pageTotal" @current-change="pagesChange"></el-pagination>
            </div>
            <div class="fl pagestyle font12">
              <span>共{{icCardInfo.pageTotal}}页，当前第{{icCardInfo.pageIndex}}页,每页{{icCardInfo.pageSize}}条，共{{icCardInfo.totalRecord}}条</span>
            </div>
            <div style="float:right;">
              <a :href="downloadExcelUrl" style="float: left">
                <el-button slot="trigger"  type="primary"  round style="margin-right: 10px">Excel模板下载</el-button>
              </a>
              <el-upload style="float: left;margin-right: 10px"
                class="upload-demo"
                :action="gUrl+'upload/uploadExcel'"
                :show-file-list="isShowFile"
                :on-success="handleUploadSuccess"
                :beforeUpload="beforeAvatarUpload"
                :file-list="fileList">
                <el-button  type="primary" round @click="getCurrentIndex()">选择附件</el-button>
              </el-upload>
              <el-button type="primary" round @click="uploadICcardList">上传到服务器</el-button>
              <el-button type="primary" round @click="handleAddIcCardShow">添加IC卡</el-button>
            </div>
          </div>
          <div class="clear20"></div>
        </div>
      </div>
    </div>
    <div class="mask-box" >
      <el-dialog title="添加IC卡"  v-loading="loading2"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
                 :visible.sync="dialogVisibleAddIcCard" width="1100px" top="50px"
                 :close-on-click-modal="false" :before-close="cancleAdd">
        <div class="entry-cocnt clearfix">
          <div class="fl">
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">用户类型：</div>
              <div class="sitemr fl usertype">
                <el-radio v-model="icCardAddParams.usertype" label="1">员工</el-radio>
                <el-radio v-model="icCardAddParams.usertype" label="2">访客</el-radio>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">选择办公写字楼：</div>
              <div class="sitemr fl">
                <el-select v-model="getCompanyMessage.buildingId" placeholder="请选择" @change="getfloorName">
                  <el-option
                    v-for="building in getCompanyMessage.buildingName"
                    :key="building.buildingId"
                    :label="building.buildingName"
                    :value="building.buildingId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="sitem clearfix" >
              <div class="siteml beforesiteml fl">选择楼层：</div>
              <div class="sitemr fl">
                <el-select v-model="getCompanyMessage.buildingFloorId" placeholder="请选择" @change="getRoomNum">
                  <el-option
                    v-for="floor in getCompanyMessage.floorName"
                    :key="floor.buildingFloorName"
                    :label="floor.buildingFloorName"
                    :value="floor.buildingFloorId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="sitem clearfix" >
              <div class="siteml beforesiteml fl">选择房间：</div>
              <div class="sitemr fl">
                <el-select v-model="getCompanyMessage.roomId" placeholder="请选择" @change="getCompanyName">
                  <el-option
                    v-for="floor in getCompanyMessage.roomNum"
                    :key="floor.buildingRoomName"
                    :label="floor.buildingRoomName"
                    :value="floor.buildingRoomId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="sitem clearfix" >
              <div class="siteml beforesiteml fl">选择公司名称：</div>
              <div class="sitemr fl">
                <el-select v-model="getCompanyMessage.shopId" placeholder="请选择" @change="getDepartment">
                  <el-option
                    v-for="company in getCompanyMessage.shopName"
                    :key="company.shopName"
                    :label="company.shopName"
                    :value="company.shopId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="sitem clearfix"  v-if="icCardAddParams.usertype!='2'">
              <div class="siteml beforesiteml fl"  >选择部门：</div>
              <div class="sitemr fl">
                <el-select v-model="getCompanyMessage.departmentId" placeholder="请选择">
                  <el-option
                    v-for="floor in getCompanyMessage.departmentName"
                    :key="floor.departmentName"
                    :label="floor.departmentName"
                    :value="floor.departmentId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="sitem clearfix"  v-if="icCardAddParams.usertype!='2'">
              <div class="siteml fl">新增部门：</div>
              <div class="sitemr fl" style="width: 130px;">
                <el-input v-model.trim="getCompanyMessage.newdepartmentName" placeholder="部门名称" clearable></el-input>
              </div>
              <div class="fl" style="margin-left: 20px;">
                <el-button type="primary" @click="saveDepartmentName">保存</el-button>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">姓名：</div>
              <div class="sitemr fl">
                <el-input v-model.trim="icCardAddParams.name" placeholder="请输入姓名" clearable></el-input>
              </div>
            </div>
            <div class="sitem clearfix" v-if="icCardAddParams.usertype ==1">
              <div class="siteml beforesiteml fl">手机号码：</div>
              <div class="sitemr fl">
                <el-input v-model.trim="icCardAddParams.telphone" placeholder="请输入手机号码" clearable></el-input>
              </div>
            </div>
            <div class="sitem clearfix" v-if="icCardAddParams.usertype == 2 || icCardAddParams.usertype ==''">
              <div class="siteml fl">手机号码：</div>
              <div class="sitemr fl">
                <el-input v-model.trim="icCardAddParams.telphone" placeholder="请输入手机号码" clearable></el-input>
              </div>
            </div>
          </div>
          <div class="fl">
            <div class="sitem clearfix">
              <div class="siteml fl">身份证号：</div>
              <div class="sitemr fl">
                <el-input v-model.trim="icCardAddParams.idcode" placeholder="请输入身份证号码" clearable></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml beforesiteml fl">卡号：</div>
              <div class="sitemr fl">
                <el-input v-model.trim="icCardAddParams.iccardCode" placeholder="请输入卡号" clearable></el-input>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl"> </div>
              <div class="sitemr fl sex">
                <el-button type="primary" @click="choseBuilding">选择通行写字楼</el-button>
              </div>
            </div>
            <div class="sitem clearfix">
              <div class="siteml  fl" style="width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">已选通行写字楼：</div>
              <div class="sitemr fl" style="margin-top: 5px; width: 420px;" >
                <div v-for="(item,index) in trueBuilding" :key="index" style="line-height: 30px">
                  <div v-if="item.cardtype == '常驻'">
                    {{item.tempgetName}} <span >常驻</span>
                    <div style="display: inline" v-if="item.openTime">
                      <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                    </div>
                  </div>
                  <div v-else="item.cardtype == '时间段'">
                    {{item.tempgetName}} <span >{{item.startTime}} 至 {{item.endTime}}</span>
                    <div style="display: inline" v-if="item.openTime">
                      <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mask-box" >
              <el-dialog
                width="576px"
                title="选择通行写字楼"
                :visible.sync="innerVisible"
                append-to-body>
                <div class="entry-cocnt clearfix">
                  <div class="sitem clearfix">
                    <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">请选择通行写字楼：</div>
                    <div class="sitemr fl sex">
                      <el-select v-model="icCardAddParams.buildingId" placeholder="请选择" @change="changeBuildingName">
                        <el-option
                          v-for="item,index in passerCardList"
                          :key="item.buildingId"
                          :label="item.buildingName"
                          :value="item.buildingId">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="sitem clearfix">
                    <div class="siteml beforesiteml fl " style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">类型：</div>
                    <div class="sitemr fl sex" style="margin-top: 10px" @change="changeCardtype">
                      <el-radio v-model="icCardAddParams.type" label="1">常驻</el-radio>
                      <el-radio v-model="icCardAddParams.type" label="2">时间段</el-radio>
                    </div>
                  </div>
                  <div class="fr" v-if="icCardAddParams.type=='1'">
                    <div class="sitemr fl">
                      <span style="position: absolute;display: inline-block;width: 141px;line-height: 24px; color: red;margin-left: -135px;margin-top: 27px">此两项为非必选，若不选则默认全天通行</span>
                    </div>
                  </div>
                  <div class="sitem clearfix" v-if="icCardAddParams.type=='1'">
                    <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许进入时间：</div>
                    <div class="sitemr fl">
                      <el-time-picker
                        v-model="icCardAddParams.openTime"
                        :picker-options="{}"
                        format='HH:mm'
                        value-format="HH:mm"
                        placeholder="选择进出时间">
                      </el-time-picker>
                    </div>
                  </div>
                  <div class="sitem clearfix" v-if="icCardAddParams.type=='1'">
                    <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许外出时间：</div>
                    <div class="sitemr fl">
                      <el-time-picker
                        v-model="icCardAddParams.closeTime"
                        format='HH:mm'
                        value-format="HH:mm"
                        :picker-options="{}"
                        placeholder="选择进出时间">
                      </el-time-picker>
                    </div>
                  </div>
                  <div class="sitem clearfix" v-if="icCardAddParams.type!='1'">
                    <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">生效时间：</div>
                    <div class="sitemr fl">
                      <el-date-picker
                        v-model="icCardAddParams.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="fr" v-if="icCardAddParams.type!='1'">
                    <div class="sitemr fl">
                      <span style="position: absolute;display: inline-block;width: 141px;line-height: 24px; color: red;margin-left: -135px;margin-top: 85px">此两项为非必选，若不选则默认全天通行</span>
                    </div>
                  </div>
                  <div class="sitem clearfix" v-if="icCardAddParams.type!='1'">
                    <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">失效时间：</div>
                      <div class="sitemr fl">
                          <el-date-picker
                          v-model="icCardAddParams.endTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                  </div>
                  <div class="sitem clearfix" v-if="icCardAddParams.type!='1'">
                    <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许进入时间：</div>
                    <div class="sitemr fl">
                      <el-time-picker
                        v-model="icCardAddParams.openTime"
                        format='HH:mm'
                        value-format="HH:mm"
                        placeholder="选择进出时间">
                      </el-time-picker>
                    </div>
                  </div>
                  <div class="sitem clearfix" v-if="icCardAddParams.type!='1'">
                    <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许外出时间：</div>
                    <div class="sitemr fl">
                      <el-time-picker
                        v-model="icCardAddParams.closeTime"
                        format='HH:mm'
                        value-format="HH:mm"
                        placeholder="选择进出时间">
                      </el-time-picker>
                    </div>
                  </div>
                  <div class="sitem clearfix">
                    <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;"></div>
                    <div class="sitemr fl">
                      <el-button type="primary" @click="saveBuildings" :disabled="disabled">保存并选择下一个</el-button>
                    </div>
                  </div>
                </div>
                <div class="sitem clearfix">
                  <div class="siteml  fl" style="width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">已选通行写字楼：</div>
                  <div class="fl" style="display: inline-block;width: 300px;">
                    <div class="sitemr fl" style="margin-top: 10px;width:300px;" v-for="(item,index) in tempbuilding" :key="index">
                      <div v-if="item.cardtype == '常驻'">
                        {{item.tempgetName}} <span >常驻</span>
                        <div style="display: inline" v-if="item.openTime">
                          <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                        </div>
                      </div>
                      <div v-else="item.cardtype == '时间段'">
                        {{item.tempgetName}} <span >{{item.startTime}} 至 {{item.endTime}}</span>
                        <div style="display: inline" v-if="item.openTime">
                          <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="cancleBuildingList">取 消</el-button>
                  <div style="display: inline;">
                    <el-button type="primary" @click="addBuildingList" >全部保存</el-button>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleAdd">取 消</el-button>
          <el-button type="primary" @click="addIcCard">保 存</el-button>
        </div>
      </el-dialog>

      <!--编辑部分-->
      <el-dialog title="编辑IC卡" :visible.sync="dialogVisibleEditIcCard" width="700px" top="50px" :close-on-click-modal="false" :before-close="editCancle">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">用户类型：</div>
            <div class="sitemr fl usertype">
              <div v-if="editMessage.cardType ==1">员工</div>
              <div v-if="editMessage.cardType ==2">访客</div>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml  fl">选择办公写字楼：</div>
            <div class="sitemr fl">
              <el-select v-model="getCompanyMessage.buildingId" placeholder="请选择" @change="getfloorName">
                <el-option
                  v-for="building in getCompanyMessage.buildingName"
                  :key="building.buildingId"
                  :label="building.buildingName"
                  :value="building.buildingId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix" >
            <div class="siteml fl">选择楼层：</div>
            <div class="sitemr fl">
              <el-select v-model="getCompanyMessage.buildingFloorId" placeholder="请选择" @change="getRoomNum">
                <el-option
                  v-for="floor in getCompanyMessage.floorName"
                  :key="floor.buildingFloorName"
                  :label="floor.buildingFloorName"
                  :value="floor.buildingFloorId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix" >
            <div class="siteml  fl">选择房间：</div>
            <div class="sitemr fl">
              <el-select v-model="getCompanyMessage.roomId" placeholder="请选择" @change="getCompanyName">
                <el-option
                  v-for="floor in getCompanyMessage.roomNum"
                  :key="floor.buildingRoomName"
                  :label="floor.buildingRoomName"
                  :value="floor.buildingRoomId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix" >
            <div class="siteml beforesiteml fl">选择公司名称：</div>
            <div class="sitemr fl">
              <el-select v-model="editMessage.shopId" placeholder="请选择" @change="getDepartment">
                <el-option
                  v-for="company in getCompanyMessage.shopName"
                  :key="company.shopName"
                  :label="company.shopName"
                  :value="company.shopId">
                </el-option>
                <!--<el-option-->
                  <!--v-for="company in getCompanyMessage.shopName"-->
                  <!--:key="company.shopName"-->
                  <!--:label="company.shopName"-->
                  <!--:value="company.shopId">-->
                <!--</el-option>-->
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix"  v-if="editMessage.cardType!='2'">
            <div class="siteml beforesiteml fl"  >选择部门：</div>
            <div class="sitemr fl">
              <el-select v-model="editMessage.departmentId" placeholder="请选择">
                <el-option
                  v-for="floor in getCompanyMessage.departmentName"
                  :key="floor.departmentName"
                  :label="floor.departmentName"
                  :value="floor.departmentId">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix"  v-if="editMessage.cardType!='2'">
            <div class="siteml  fl">新增部门：</div>
            <div class="sitemr fl" style="width: 130px;">
              <el-input v-model.trim="getCompanyMessage.newdepartmentName" placeholder="部门名称" clearable></el-input>
            </div>
            <div class="fl" style="margin-left: 20px;">
              <el-button type="primary" @click="saveDepartmentName">保存</el-button>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">姓名：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="editMessage.name" placeholder="请输入姓名" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">手机号码：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="editMessage.phone" placeholder="请输入手机号码" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml fl">身份证号：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="editMessage.idcode" placeholder="请输入身份证号码"clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">卡号：</div>
            <div class="sitemr fl">
              <el-input v-model.trim="cardNum" placeholder="请输入卡号" clearable></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml  fl"> </div>
            <div class="sitemr fl sex">
              <el-button type="primary" @click="editSelctbuilding">选择通行写字楼</el-button>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml  fl" style="width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">已选通行写字楼：</div>
            <div class="sitemr fl" style="margin-top: 10px;width:460px;">
              <div  v-for="(item,index) in editMessage.building" :key="index">
                <div v-if="item.type == '1'">
                  {{item.buildingName}} <span >常驻</span>
                  <div style="display: inline;" v-if="item.openTime">
                    <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                  </div>
                  <span @click="currentEditBuilding(item)" style="color: #1989FA;cursor: pointer">编辑</span>
                </div>
                <div v-else="item.type == '2'">
                  {{item.buildingName}} <span >{{item.startTime}} 至 {{item.endTime}}</span>
                  <div style="display: inline;" v-if="item.openTime">
                    <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                  </div>
                  <span @click="currentEditBuilding(item)" style="color: #1989FA;cursor:pointer;">编辑</span>
                </div>
              </div>
            </div>
          </div>
          <!--逐条编辑-->
          <div class="mask-box" >
            <el-dialog
              width="30%"
              title="修改时间"
              :visible.sync="innerVisible2"
              append-to-body>
              <div class="entry-cocnt clearfix">
                <div class="sitem clearfix">
                  <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">请选择通行写字楼：</div>
                  <div class="sitemr fl sex">
                    <el-select v-model="tempcurrentEditBuilding.buildingId" placeholder="请选择" disabled>
                      <el-option
                        v-for="item,index in passerCardList"
                        :key="item.buildingId"
                        :label="item.buildingName"
                        :value="item.buildingId">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="sitem clearfix">
                  <div class="siteml beforesiteml fl " style="width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">类型：</div>
                  <div class="sitemr fl sex" style="margin-top: 10px"><!--@change="changeCardtype"-->
                    <el-radio-group v-model="tempcurrentEditBuilding.type">
                      <el-radio  :label="1" disabled>常驻</el-radio>
                      <el-radio  :label="2" disabled>时间段</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="sitem clearfix" v-if="tempcurrentEditBuilding.type!='1'">
                  <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">生效时间：</div>
                  <div class="sitemr fl">
                    <el-date-picker
                      v-model="tempcurrentEditBuilding.startTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="sitem clearfix" v-if="tempcurrentEditBuilding.type!='1'">
                  <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">失效时间：</div>
                  <div class="sitemr fl">
                    <el-date-picker
                      v-model="tempcurrentEditBuilding.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="sitem clearfix" >
                  <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许进入时间：</div>
                  <div class="sitemr fl">
                    <el-time-picker
                      v-model="tempcurrentEditBuilding.openTime"
                      :picker-options="{}"
                      format='HH:mm'
                      value-format="HH:mm"
                      placeholder="选择进入时间">
                    </el-time-picker>
                  </div>
                </div>
                <div class="sitem clearfix" >
                  <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许外出时间：</div>
                  <div class="sitemr fl">
                    <el-time-picker
                      v-model="tempcurrentEditBuilding.closeTime"
                      :picker-options="{}"
                      format='HH:mm'
                      value-format="HH:mm"
                      placeholder="选择外出时间">
                    </el-time-picker>
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancleeidtBuildingList1">取 消</el-button>
                <el-button type="primary" @click="sureEditBuildings">确定</el-button>
              </div>
            </el-dialog>
          </div>

          <!--编辑第二层弹框-->
          <div class="mask-box" >
            <el-dialog
              width="640px" top="50px"
              title="选择通行写字楼"
              :visible.sync="innerVisible1"
              append-to-body>
              <div class="entry-cocnt clearfix">
                <div class="sitem clearfix">
                  <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">请选择通行写字楼：</div>
                  <div class="sitemr fl sex">
                    <el-select v-model="icCardEditSaveParams.buildingId" placeholder="请选择" @change="changeBuildingName">
                      <el-option
                        v-for="item,index in passerCardList"
                        :key="item.buildingId"
                        :label="item.buildingName"
                        :value="item.buildingId">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="sitem clearfix">
                  <div class="siteml beforesiteml fl " style="width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">类型：</div>
                  <div class="sitemr fl sex" style="margin-top: 10px" @change="changeCardtype"><!---->
                    <el-radio v-model="icCardEditSaveParams.type" label="1">常驻</el-radio>
                    <el-radio v-model="icCardEditSaveParams.type" label="2">时间段</el-radio>
                  </div>
                </div>
                <div class="sitem clearfix" v-if="icCardEditSaveParams.type!='1'">
                  <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">生效时间：</div>
                  <div class="sitemr fl">
                    <el-date-picker
                      v-model="icCardEditSaveParams.startTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="sitem clearfix" v-if="icCardEditSaveParams.type!='1'">
                  <div class="siteml beforesiteml fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">失效时间：</div>
                  <div class="sitemr fl">
                    <el-date-picker
                      v-model="icCardEditSaveParams.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="sitem clearfix" >
                  <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许进入时间：</div>
                  <div class="sitemr fl">
                    <el-time-picker
                      v-model="icCardEditSaveParams.openTime"
                      :picker-options="{}"
                      format='HH:mm'
                      value-format="HH:mm"
                      placeholder="选择进入时间">
                    </el-time-picker>
                  </div>
                </div>
                <div class="sitem clearfix" >
                  <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">允许外出时间：</div>
                  <div class="sitemr fl">
                    <el-time-picker
                      v-model="icCardEditSaveParams.closeTime"
                      :picker-options="{}"
                      format='HH:mm'
                      value-format="HH:mm"
                      placeholder="选择外出时间">
                    </el-time-picker>
                  </div>
                </div>
                <div class="sitem clearfix">
                  <div class="siteml  fl" style=" width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;"></div>
                  <div class="sitemr fl">
                    <el-button type="primary" @click="saveEditBuildings">保存并选择下一个</el-button>
                  </div>
                </div>
              </div>
              <div class="sitem clearfix">
                <div class="siteml  fl" style="width: 140px;text-align: right;margin-right: 10px;line-height: 40px;margin-bottom: 20px;">已选通行写字楼：</div>
                <div class="siteml" style="display:inline-block;width: 400px;">
                  <div class="sitemr fl" style="margin-top: 10px;width:400px;" v-for="(item,index) in tempEditBuilding" :key="index">
                    <div v-if="item.type == '1'">
                      {{item.buildingName}} <span >常驻</span>
                      <div style="display: inline" v-if="item.openTime">
                        <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                      </div>
                    </div>
                    <div v-else="item.type == '2'">
                      {{item.buildingName}} <span >{{item.startTime}} 至 {{item.endTime}}</span>
                      <div style="display: inline" v-if="item.openTime">
                        <span>{{item.openTime}}</span><span>至</span><span>{{item.closeTime}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancleeidtBuildingList">取 消</el-button>
                <el-button type="primary" @click="addEditBuildingList">全部保存</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editCancle">取 消</el-button>
          <el-button type="primary" @click="handleEditIcCard">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="冻结IC卡" :visible.sync="dialogVisibleDeleteIcCard" width="30%">
        <span>您确定要冻结吗</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDeleteIcCard = false">取 消</el-button>
          <el-button type="primary" @click="changeIcCardEnable();">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="删除IC卡" :visible.sync="dialogVisibleDeleteIcCard1" width="30%">
        <span>您确定要删除吗</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDeleteIcCard1 = false">取 消</el-button>
          <el-button type="primary" @click="changeIcCardEnable();">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {$gDownLoad} from '@/assets/js/gUrl'
  import {$gPasserUrl} from '@/assets/js/gUrl'
  import gUrl from '@/assets/js/gUrl'

  export default {
    data() {
      return {
      	text:'正在加载，请稍候',
        downloadExcelUrl: $gDownLoad + '导入IC卡模板.xlsx',
        isShowFile:false,
        gUrl:gUrl,
        icCardListPath:'',
        //action: $gPasserUrl + 'excel/importICCard',
        importResult: [],
        fileList: [],
        shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
        grantUserId:this.$local.sefetch('info') ? this.$local.sefetch('info').userId : '',
        type: {
          /*  type:2,
            productId:this.$local.sefetch('productInfo')?this.$local.sefetch('productInfo').productId:'',*/
        },
        //上传头部
        uploadHead:{'token':this.$local.sefetch('info')?this.$local.sefetch('info').token:''},

        companyId:{
          businessExtendShopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
        },
        disabled:false,//选择进出时间控制
        selectInoutTime:false,
        loading2:false,
        tempgetName:'',
        building:'',
        tempbuilding:[],//存储要展示的字符串
        tempEditBuilding:[],//编辑内层要展示的
        trueBuilding:[],//回到第一层要展示的数据
        eidtTrueBuilding:[],//回到第一层编辑的building
        getCompanyMessage:{
          buildingName:'',//写字楼
          buildingId:'',//公司id
          floorName:'',//所在楼层
          floorId:'',//楼层id
          roomNum:'',//房间号
          roomId:'',//房间id
          shopName:[],//公司名称
          shopId:'',//公司id
          departmentName: [],//部门名称
          newdepartmentName:'',//新增部门名称
          departmentId: "",//部门id
        },
        icCardEditSaveParams:{//编辑选择楼
          buildingName:'',
          cardtype:'1',
          buildingId:'',
          type:'1',
          startTime:'',
          endTime:'',
          openTime:'',
          closeTime:'',
        },
        tempcurrentEditBuilding:{//单条编辑
          buildingName:'',
          cardtype:'1',
          buildingId:'',
          type:'1',
          startTime:'',
          endTime:'',
          openTime:'',
          closeTime:'',
        },
        cardNum:'',//编辑旧卡号
        oldNum:'',//编辑新卡号
        editrow:{},
        //编辑返回来的参数
        editMessage:{
          building:[],
          cardType:'1',
          departmentId:'',
          departmentName:'',
          idcode:'',
          name:'',
          phone:'',
          shopId:'',
          shopName:'',
        },
        oldShopId:'',//编辑时所传的旧公司id
        oldDepartmentId:'',//编辑时所传的旧部门id
        //搜索IC卡参数
        searchIcCardParams:{
          propertyCompanyId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          companyName:'',
          ICCardNum:'',
          pageIndex:1,
          pageSize:30,
          cardNum:''
        },
        //IC卡信息
        icCardInfo:{
          pageIndex:0,//当前页
          pageSize:30,//每页条数
          pageTotal:0,//总页数
          totalRecord:0,//总条数
          icCardList:[]
        },
        //新增IC卡参数
        icCardAddParams:{
          userId:this.$local.sefetch('info')?this.$local.sefetch('info').userId:'',//发卡人
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          usertype:"1",//用户类型，4，员工，5，访客
          name:'',//姓名
          telphone:'',//手机号码
          idcode:'',//身份证号
          iccardCode:'',//IC卡号
          enable:'Y',//是否冻结，Y为启用，N为冻结
          type:'1',//类型，1，常驻，3，时间段
          //2月19添加字段
          openTime:'',
          closeTime:'',

          startTime:'',//生效时间
          endTime:'',//失效时间
          building:[],
          buildingId:''
        },
        //修改IC卡参数
        icCardEditParams:{
          cardNum:'',//卡号
          customerUserId:'',//用户id
        },
        icCardEnableParams:{
          ICCardNum:'',//IC卡号
          passercardId:'',//主键ID
          userId:'',//用户ID
          type:'',//是否冻结,Y为激活，F为冻结，N为失效
        },
        //通行证里列表
        passerCardList:[],
        //表格选中的row的列表
        selectionRowArray:[],
        //删除IC卡参数
        deleteIcCardParams:{
          passercardId:'',//主键ID
          shopId:this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'',
          icCardIdList:[]
        },
        dialogVisibleAddIcCard: false,//弹层显示隐藏
        dialogVisibleEditIcCard: false,//弹层显示隐藏
        dialogVisibleDeleteIcCard: false,//弹层显示隐藏
        dialogVisibleDeleteIcCard1:false,//弹层显示隐藏
        innerVisible:false,
        innerVisible1:false,//编辑第二层
        innerVisible2:false,//逐条编辑
      }
    },
    methods: {
      //导入IC 卡
      //上传文件成功钩子
      handleUploadSuccess(response,fileList){
        let path = response.result
        this.icCardListPath = path;
        //this.tableData.tableData[this.currentIndex]['path'] = path;
        this.$message.success('添加成功')

      },
      getCurrentIndex(){

      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },

      //文件上傳前的鉤子
      beforeAvatarUpload(file){
        {
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
          const extension = testmsg === 'xls'
          const extension2 = testmsg === 'xlsx'
          const isLt2M = file.size / 1024 / 1024 < 100
          if(!extension && !extension2) {
            this.$message({
              message: '上传文件只能是 xls、xlsx格式!',
              type: 'warning'
            });
          }
          if(!isLt2M) {
            this.$message({
              message: '上传文件大小不能超过 100MB!',
              type: 'warning'
            });
          }
          return extension || extension2 && isLt2M
        }
      },

      indexMethod(index) {//编号
        return (this.icCardInfo.pageIndex - 1)*30 + 1 + index;
      },
      //查询按钮钩子
      handleSearchIcCard(){
        this.getIcCardByCondition()
      },
      //切换类型
      changeCardtype(){
        this.icCardAddParams.openTime = ''
        this.icCardAddParams.closeTime =''
      },
      //全部保存
      addBuildingList(){
        this.icCardAddParams.building = JSON.parse(JSON.stringify(this.tempbuilding))
        this.trueBuilding = JSON.parse(JSON.stringify(this.tempbuilding));
        this.innerVisible = false;
      },
      //编辑全部保存
      addEditBuildingList(){
        this.editMessage.building = JSON.parse(JSON.stringify(this.tempEditBuilding))
        this.eidtTrueBuilding = JSON.parse(JSON.stringify(this.tempEditBuilding));
        this.innerVisible1 = false;
      },
      //编辑取消
      cancleBuildingList(){
        this.innerVisible = false;
        //this.icCardAddParams.building = [];
        this.tempbuilding = [];
       /* for(let i in this.getCompanyMessage){
          this.getCompanyMessage[i]='';
        }*/
      },
      cancleeidtBuildingList(){
        this.innerVisible1 = false;
        this.icCardAddParams.building = [];
        this.tempbuilding = [];
      },
      cancleeidtBuildingList1(){
        this.innerVisible2= false;
      },
      changeBuildingName(value){
        let obj = {};
        obj = this.passerCardList.find((item)=>{
          return item.buildingId === value;
        });
        let getName = ''
        getName = obj.buildingName;
        this.tempgetName = getName;
      },
      //编辑选择写字楼
      editSelctbuilding(){
        this.innerVisible1 = true;
        this.tempEditBuilding = JSON.parse(JSON.stringify(this.editMessage.building))
      },
      //选择写字楼和类型
      saveBuildings(){
        let tempbuild={};//存储字符串中对象
        let startTime = this.icCardAddParams.startTime
        let endTime = this.icCardAddParams.endTime
        let openTime = this.icCardAddParams.openTime
        let closeTime = this.icCardAddParams.closeTime

        if(this.icCardAddParams.type=='2'){
          if(this.icCardAddParams.startTime==null || this.icCardAddParams.startTime==''){
            this.$message.success('请选择生效时间')
          }
          else if(this.icCardAddParams.endTime == null || this.icCardAddParams.endTime==''){
            this.$message.success('请选择失效时间')
          }
          else if(endTime<startTime){
            this.$message.success('失效时间必须大于生效时间')
          }else if((openTime==''||openTime==null)&&(closeTime!=''&&closeTime!=null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else if((openTime!=''&&openTime!=null)&&(closeTime==''||closeTime==null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          } else{
            tempbuild.tempgetName = this.tempgetName
            tempbuild.cardtype = '时间段'
            tempbuild.startTime = startTime
            tempbuild.endTime = endTime
            tempbuild.openTime = openTime
            tempbuild.closeTime = closeTime
            tempbuild.buildingId = this.icCardAddParams.buildingId
            tempbuild.type='2'
            let flag = this.$local.operateObjArray(this.tempbuilding,tempbuild);
            if(flag!==false){
              this.tempbuilding[flag] = tempbuild
            }
            else{
              let buildingNameArray =[];
              for(let o in this.tempbuilding){
                buildingNameArray.push(this.tempbuilding[o].tempgetName)
              }
              if(tempbuild.tempgetName == ''){
                this.$message.error("请选择写字楼")
              }
              else if(buildingNameArray.indexOf(tempbuild.tempgetName)!=-1){
                this.$message.error("该写字楼IC卡已选择")
              }
              else{
                this.tempbuilding.push(tempbuild)
              }
            }
          }
        }
        if(this.icCardAddParams.type=='1'){
          tempbuild.tempgetName = this.tempgetName
          tempbuild.cardtype = '常驻'
          tempbuild.startTime = ''
          tempbuild.endTime = ''
          tempbuild.openTime = openTime
          tempbuild.closeTime = closeTime
          tempbuild.type='1'
          tempbuild.buildingId = this.icCardAddParams.buildingId
          let flag = this.$local.operateObjArray(this.tempbuilding,tempbuild);
          if(flag!==false){
            this.tempbuilding[flag] = tempbuild
          }else if((openTime==''||openTime==null)&&(closeTime!=''&&closeTime!=null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else if((openTime!=''&&openTime!=null)&&(closeTime==''||closeTime==null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }
          else{
            let buildingNameArray =[];
            for(let o in this.tempbuilding){
              buildingNameArray.push(this.tempbuilding[o].tempgetName)
            }
            if(tempbuild.tempgetName == ''){
              this.$message.error("请选择写字楼")
            }
            else if(buildingNameArray.indexOf(tempbuild.tempgetName)!=-1){
              this.$message.error("该写字楼IC卡已选择")
            }
            else {
              this.tempbuilding.push(tempbuild)
            }
          }
        }
      },
      //正式选择楼
      saveTrueBuildings(){

      },
      saveEditBuildings(){//编辑写字楼
        let tempbuild={};//存储字符串中对象
        let startTime = this.icCardEditSaveParams.startTime
        let endTime = this.icCardEditSaveParams.endTime
        let openTime = this.icCardEditSaveParams.openTime
        let closeTime = this.icCardEditSaveParams.closeTime
        if(this.icCardEditSaveParams.type=='2'){
          if(this.icCardEditSaveParams.startTime==null || this.icCardEditSaveParams.startTime==''){
            this.$message.success('请选择生效时间')
          }
          else if(this.icCardEditSaveParams.endTime == null || this.icCardEditSaveParams.endTime==''){
            this.$message.success('请选择失效时间')
          }
          else if(endTime<startTime){
            this.$message.success('失效时间必须大于生效时间')
          }else if((openTime==''||openTime==null)&&(closeTime!=''&&closeTime!=null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else if((openTime!=''&&openTime!=null)&&(closeTime==''||closeTime==null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }
          else{
            tempbuild.buildingName = this.tempgetName
            tempbuild.cardtype = '时间段'
            tempbuild.startTime = startTime
            tempbuild.endTime = endTime
            tempbuild.openTime = openTime
            tempbuild.closeTime = closeTime
            tempbuild.buildingId = this.icCardEditSaveParams.buildingId
            tempbuild.type='2'
            let flag = this.$local.operateObjArray(this.tempEditBuilding,tempbuild);
            if(flag!==false){
              this.tempEditBuilding[flag] = tempbuild
            }
            else{
              let buildingNameArray =[]
              for(let o in this.tempEditBuilding){
                buildingNameArray.push(this.tempEditBuilding[o].buildingName)
              }
              if(tempbuild.tempgetName == ''){
                this.$message.error("请选择写字楼")
              }else if(buildingNameArray.indexOf(tempbuild.buildingName)!=-1){
                this.$message.error("该写字楼IC卡已选择")
              }
              else {
                this.tempEditBuilding.push(tempbuild)
              }
            }
          }
        }
        if(this.icCardEditSaveParams.type=='1'){
          tempbuild.buildingName = this.tempgetName
          tempbuild.cardtype = '常驻'
          tempbuild.startTime = ''
          tempbuild.endTime = ''
          tempbuild.openTime = openTime
          tempbuild.closeTime = closeTime
          tempbuild.type='1'
          tempbuild.buildingId = this.icCardEditSaveParams.buildingId
          let flag = this.$local.operateObjArray(this.tempEditBuilding,tempbuild);
          if(flag!==false){
            this.tempEditBuilding[flag] = tempbuild
          }else if((openTime==''||openTime==null)&&(closeTime!=''&&closeTime!=null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else if((openTime!=''&&openTime!=null)&&(closeTime==''||closeTime==null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }
          else{
            let buildingNameArray =[]
            for(let o in this.tempEditBuilding){
              buildingNameArray.push(this.tempEditBuilding[o].buildingName)
            }
            if(tempbuild.tempgetName == ''){
              this.$message.error("请选择写字楼")
            }else if(buildingNameArray.indexOf(tempbuild.buildingName)!=-1){
              this.$message.error("该写字楼IC卡已选择")
            }else {
              this.tempEditBuilding.push(tempbuild)
            }
          }
        }
      },
      //点击选择写字楼
      choseBuilding(){
        this.innerVisible = true;
        this.tempbuilding = JSON.parse(JSON.stringify(this.trueBuilding));
      },
      //获取写字楼
      getbuildingName(){
        this.$httpPasser.post("building/getBuildingListByCompanyId",{
          companyId:this.companyId.businessExtendShopId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
              this.getCompanyMessage.buildingName = res.data.result;
              this.getCompanyMessage.roomId ='';
              this.getCompanyMessage.shopId='';
              this.editMessage.shopId ='';
              this.editMessage.departmentId = ''
          }else if(res.data.resultCode == "406"){
            this.$message.error(res.data.resultCodeDesc);
          }
        })
      },
      //获取楼层
      getfloorName(){
        this.$httpPasser.post("building/getBuildingFloorListByBuildingId",{
          buildingId:this.getCompanyMessage.buildingId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.getCompanyMessage.floorName = res.data.result.buildingFloorList;
            this.getCompanyMessage.buildingFloorId ='';
            this.getCompanyMessage.roomId ='';
            this.getCompanyMessage.shopId=''
            this.getCompanyMessage.departmentName =''
          }
        })
      },
      //获取房间
      getRoomNum(){
        this.$httpPasser.post("building/getBuildingRoomListByBuildingFloorId",{
          buildingFloorId:this.getCompanyMessage.buildingFloorId
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.getCompanyMessage.roomNum = res.data.result.buildingRoomList;
            this.getCompanyMessage.roomId ='';
            this.getCompanyMessage.shopId='';
            this.editMessage.shopId ='';
            this.editMessage.departmentId = ''
          }
        })
      },
      //获取公司
      getCompanyName(){
        this.$httpPasser.post("ICCard/getShopNameByRoomId",{
          roomId:this.getCompanyMessage.roomId
        }).then((res)=>{
          if(res.data.resultCode == 200){
            console.log( res.data.result)
            this.getCompanyMessage.shopName = res.data.result
            //this.getCompanyMessage.shopId = res.data.result.shopId
          }
        })
      },
      //获取部门
      getDepartment(params){
        this.$httpPasser.post("company/queryDepartmentByCompanyId",{
          companyId:this.getCompanyMessage.shopId?this.getCompanyMessage.shopId:params,
          pageIndex:1,
          pageSize:30
        }).then((res)=>{
          this.getCompanyMessage.departmentName = res.data.result.departmentList
        })
      },
      saveDepartmentName(){
        this.$httpPasser.post("company/saveDepartment",{
          companyId:this.getCompanyMessage.shopId?this.getCompanyMessage.shopId:this.editMessage.shopId,
          departmentName:this.getCompanyMessage.newdepartmentName,
          type:'1'
        }).then((res)=>{
          if(res.data.resultCode == 200){
            this.getDepartment(this.getCompanyMessage.shopId?this.getCompanyMessage.shopId:this.editMessage.shopId);
          }
        })
      },
      //取消选择
      cancleAdd(){
        this.dialogVisibleAddIcCard= false;
        for(let i in this.getCompanyMessage){
          this.getCompanyMessage[i]='';
        }
      },
      addIcCard(){
        if(this.icCardAddParams.usertype=='1'){
          if(this.icCardAddParams.usertype==''){
            this.$message.error("请选择用户类型")
          }else if(this.getCompanyMessage.shopId == ''){
            this.$message.error("请选择公司名称")
          }else if(this.getCompanyMessage.cardNum == ''){
            this.$message.error("请输入卡号")
          }else if(this.getCompanyMessage.name == ''){
            this.$message.error("请输入姓名")
          }else if(this.icCardAddParams.telphone==''){
            this.$message.error("请输入手机号")
          }else if(this.icCardAddParams.building==''){
            this.$message.error("请选择写字楼")
          }else{
            this.$httpPasser.post("passerICCard/addCard",{
              grantUserId:this.icCardAddParams.userId,
              cardNum:this.icCardAddParams.iccardCode,
              idCode:this.icCardAddParams.idcode,
              name:this.icCardAddParams.name,
              phone:this.icCardAddParams.telphone,
              departmentId:this.getCompanyMessage.departmentId,
              shopId:this.getCompanyMessage.shopId,
              cardType:this.icCardAddParams.usertype,
              building:JSON.stringify(this.icCardAddParams.building),
            }).then((res)=>{
              if(res.data.resultCode == "200"){
                this.$message.success("添加成功");
                this.dialogVisibleAddIcCard= false;
                for(let i in this.getCompanyMessage){
                  this.getCompanyMessage[i]='';
                }
                this.tempgetName=''
                this.getIcCardByCondition();
              }else if(res.data.resultCode =="406"){
                this.$message.error(res.data.resultCodeDesc)
                this.getIcCardByCondition()
              }
            })
          }
        }else{
          if(this.icCardAddParams.usertype==''){
            this.$message.error("请选择用户类型")
          }else if(this.getCompanyMessage.shopId == ''){
            this.$message.error("请选择公司名称")
          }else if(this.getCompanyMessage.cardNum == ''){
            this.$message.error("请输入卡号")
          }else if(this.getCompanyMessage.name == ''){
            this.$message.error("请输入姓名")
          }else if(this.icCardAddParams.telphone==''&&this.icCardAddParams.idcode==''){
            this.$message.error("手机号和身份证号二选一")
          }else if(this.icCardAddParams.building==''){
            this.$message.error("请选择写字楼")
          }else{
            this.$httpPasser.post("passerICCard/addCard",{
              grantUserId:this.icCardAddParams.userId,
              cardNum:this.icCardAddParams.iccardCode,
              idCode:this.icCardAddParams.idcode,
              name:this.icCardAddParams.name,
              phone:this.icCardAddParams.telphone,
              departmentId:this.getCompanyMessage.departmentId,
              shopId:this.getCompanyMessage.shopId,
              cardType:this.icCardAddParams.usertype,
              building:JSON.stringify(this.icCardAddParams.building),
            }).then((res)=>{
              if(res.data.resultCode == "200"){
                this.$message.success("添加成功");
                this.dialogVisibleAddIcCard= false;
                for(let i in this.getCompanyMessage){
                  this.getCompanyMessage[i]='';
                }
                this.tempgetName=''
                this.getIcCardByCondition()
              }else if(res.data.resultCode =="406"){
                this.$message.error(res.data.resultCodeDesc)
                this.getIcCardByCondition()
              }
            })
          }
        }
      },
      //获取IC卡列表
      getIcCardByCondition(){
        this._httpPasser(
          'ICCard/getICCardList',
          'get',
          this.searchIcCardParams,
          data=>{
            this.icCardInfo = data
            this.icCardInfo.icCardList = data.result;
          },
          'false',
          ()=>{
          	this.text = '暂无数据'
            delete(this.icCardInfo.icCardList)
            this.$set(this.icCardInfo,'icCardList',[]);
            this.icCardInfo.pageTotal = 0;
            this.icCardInfo.totalRecord = 0;
          },
        )
      },
      //如果是魔方物业，则提供选择所有写字楼的方法
      choseAllBuildings(){
        this.icCardAddParams.buildingIds = [];
        this._httpPasser(
          'area/getBuildingListByArea',
          'get',
          {},
          data=>{
            for(let o in data.result){
              this.icCardAddParams.buildingIds.push(data.result[o].buildingId)
            }
          }
        )
      },
      //选择IC卡钩子方法
      handleSelectionChange(selection) {//复选框选中的时候触发
        this.selectionRowArray = selection;
      },

      //显示新增IC卡对话框
      handleAddIcCardShow(){
        //重置新增IC卡参数
        this.dialogVisibleAddIcCard = true;
        for(let o in this.icCardAddParams){
          this.icCardAddParams[o]= '';
        }
        this.trueBuilding = [];
        this.getbuildingName();
        this.icCardAddParams.userId = this.$local.sefetch('info')?this.$local.sefetch('info').userId:'';
        this.icCardAddParams.shopId = this.$local.sefetch('info')?this.$local.sefetch('info').companyId:'';
        this.icCardAddParams.buildingIds = [];
        this.icCardAddParams.enable = 'Y';
        this.icCardAddParams.type='1';
      },
      uploadICcardList(){//导入IC卡
        this.$httpPasser.post("excel/importICCard",{
          grantUserId:this.grantUserId,
          path:this.icCardListPath,
          shopId:this.shopId,
        }).then((res)=>{
          if(res.data.resultCode == '200'){
            this.$message.success(res.data.result)
          }else{
            this.$message.error(res.data.resultCodeDesc)
          }
          this.getIcCardByCondition()
        })
      },
      //新增IC卡方法钩子
      handleAddIcCard(){
        if(this.icCardAddParams.type=='3'){
          let startTime = this.icCardAddParams.startTime.replace(/-/g,'')
          let endTime = this.icCardAddParams.endTime.replace(/-/g,'')
          if(this.icCardAddParams.startTime==null || this.icCardAddParams.startTime==''){
            this.$message.success('请选择生效时间')
          }
          else if(this.icCardAddParams.endTime == null || this.icCardAddParams.endTime==''){
            this.$message.success('请选择失效时间')
          }
          else if(endTime<startTime){
            this.$message.success('失效时间必须大于生效时间')
          }
          else{
            this._httpPasser(
              'passerICCard/add',
              'post',
              this.icCardAddParams,
              data=>{
                this.dialogVisibleAddIcCard = false;
                this.getIcCardByCondition();
              }
            )
          }
        }
        else{
          this._httpPasser(
            'passerICCard/add',
            'post',
            this.icCardAddParams,
            data=>{
              this.dialogVisibleAddIcCard = false;
              this.getIcCardByCondition();
            }
          )
        }
      },
      //编辑单条
      currentEditBuilding(item){
        this.innerVisible2 = true;
        this.tempcurrentEditBuilding = JSON.parse(JSON.stringify(item));
      },
      //确定保存单条
      sureEditBuildings(){
        //let currentEditBuilding ={};
        let startTime = this.tempcurrentEditBuilding.startTime
        let endTime = this.tempcurrentEditBuilding.endTime
        let openTime = this.tempcurrentEditBuilding.openTime
        let closeTime = this.tempcurrentEditBuilding.closeTime
        if(this.tempcurrentEditBuilding.type == "2"){
          if(this.tempcurrentEditBuilding.startTime==null || this.tempcurrentEditBuilding.startTime==''){
            this.$message.success('请选择生效时间')
          }
          else if(this.tempcurrentEditBuilding.endTime == null || this.tempcurrentEditBuilding.endTime==''){
            this.$message.success('请选择失效时间')
          }
          else if(endTime<startTime){
            this.$message.success('失效时间必须大于生效时间')
          }if((openTime==''||openTime==null)&&(closeTime!=''&&closeTime!=null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else if((openTime!=''&&openTime!=null)&&(closeTime==''||closeTime==null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }
          else{
            for(let building in this.editMessage.building){
              if(this.editMessage.building[building].buildingId==this.tempcurrentEditBuilding.buildingId){
                this.editMessage.building[building] = JSON.parse(JSON.stringify(this.tempcurrentEditBuilding))
              }
            }
            this.innerVisible2 = false;
          }
        }
        if(this.tempcurrentEditBuilding.type=='1'){
         if((openTime==''||openTime==null)&&(closeTime!=''&&closeTime!=null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else if((openTime!=''&&openTime!=null)&&(closeTime==''||closeTime==null)){
            this.$message.success("允许进入时间和允许外出时间必须同时选择")
          }else{
            for(let building in this.editMessage.building){
              if(this.editMessage.building[building].buildingId==this.tempcurrentEditBuilding.buildingId){
                this.editMessage.building[building] = JSON.parse(JSON.stringify(this.tempcurrentEditBuilding))
              }
            }
           this.innerVisible2 = false;
          }
        }
      },
      //显示编辑IC卡对话框
      handleEditIcCardShow(row){
        this.editrow = row;
        this.dialogVisibleEditIcCard = true;
        for(let o in row){
          this.icCardEditParams[o] = row[o]
        }
        this.getbuildingName();
        this.cardNum = row.ICCardCod;
        this.$httpPasser.post("passerICCard/getCard",{
          cardNum:row.ICCardCod,
          customerUserId:row.customerUserId
        }).then((res)=>{
          if(res.data.resultCode == 200){
            this.editMessage = res.data.result
            this.oldShopId = res.data.result.shopId
            this.oldDepartmentId = res.data.result.departmentId
            this.eidtTrueBuilding = res.data.result.building;
            this.getCompanyMessage.shopName = res.data.result.shopName;
            this.getCompanyMessage.shopId = res.data.result.shopId;
            this.getCompanyMessage.shopName = res.data.result.companys;
            this.getDepartment(res.data.result.shopId)
          }else if(res.data.resultCode == 406){
            this.$message.error(res.data.resultCodeDesc)
          }
        })
      },
      //编辑IC卡钩子
      handleEditIcCard(row){
        if(this.icCardEditParams.type=='2'){
          let startTime = this.icCardEditParams.startTime.replace(/-/g,'')
          let endTime = this.icCardEditParams.endTime.replace(/-/g,'')
          if(this.icCardEditParams.startTime==null || this.icCardEditParams.startTime==''){
            this.$message.success('请选择生效时间')
          }
          else if(this.icCardEditParams.endTime == null || this.icCardEditParams.endTime==''){
            this.$message.success('请选择失效时间')
          }
          else if(endTime<startTime){
            this.$message.success('失效时间必须大于生效时间')
          }
          else{
            this.$httpPasser.post("passerICCard/saveCard",{
              cardNum:this.cardNum,
              idCode:this.editMessage.idcode,
              name:this.editMessage.name,
              phone:this.editMessage.phone,
              departmentId:this.editMessage.departmentId,
              shopId:this.editMessage.shopId,
              cardType:this.editMessage.cardType,
              building:JSON.stringify(this.eidtTrueBuilding),
              customerUserId:this.editrow.customerUserId,
              oldNum:this.editrow.ICCardCod,
              oldShopId:this.oldShopId,
              oldDepartmentId:this.oldDepartmentId
            }).then((res)=>{
                if(res.data.resultCode == '200'){
                  this.$message.success("编辑成功");
                  for(let i in this.getCompanyMessage){
                    this.getCompanyMessage[i]='';
                  }
                  this.getIcCardByCondition()
                  this.dialogVisibleEditIcCard = false;
                }else if(res.data.resultCode == "406"){
                  this.getIcCardByCondition()
                  this.$message.error(res.data.resultCodeDesc)
                }
            })
          }
        }
        else{
          this.$httpPasser.post("passerICCard/saveCard",{
            cardNum:this.cardNum,
            idCode:this.editMessage.idcode,
            name:this.editMessage.name,
            phone:this.editMessage.phone,
            departmentId:this.editMessage.departmentId,
            shopId:this.editMessage.shopId,
            cardType:this.editMessage.cardType,
            building:JSON.stringify(this.eidtTrueBuilding),
            customerUserId:this.editrow.customerUserId,
            oldNum: this.editrow.ICCardCod,
            oldShopId:this.oldShopId,
            oldDepartmentId:this.oldDepartmentId
          }).then((res)=>{
            if(res.data.resultCode == '200'){
              this.$message.success("编辑成功");
              this.dialogVisibleEditIcCard = false;
              this.getIcCardByCondition()
              for(let i in this.getCompanyMessage){
                this.getCompanyMessage[i]='';
              }
              this.getIcCardByCondition()
            }else if(res.data.resultCode == "406"){
              this.$message.error(res.data.resultCodeDesc)
              this.getIcCardByCondition()
            }
          })
        }
        //this.icCardEditParams.passerCardIdList = this.icCardEditParams.passerCardList
      },
      editCancle(){
        this.dialogVisibleEditIcCard = false
        for(let i in this.getCompanyMessage){
          this.getCompanyMessage[i]='';
        }
      },
      //冻结启用IC卡
      changeIcCardEnable(){
        this._httpPasser(
          'ICCard/updateICCardStatus',
          'post',
          this.icCardEnableParams,
          data=>{
            this.dialogVisibleDeleteIcCard = false;
            this.dialogVisibleDeleteIcCard1 = false;
            this.getIcCardByCondition();
          }
        )
      },

      //单个冻结IC卡显示对话框
      handleDeleteSignalIcCardShow(row,enable){
       this.icCardEnableParams.type = enable;
       this.icCardEnableParams.ICCardNum = row.ICCardCod;
       this.icCardEnableParams.userId = row.customerUserId
       if(enable=='F'){
         this.dialogVisibleDeleteIcCard = true;
       }else if(enable=='N'){
         this.dialogVisibleDeleteIcCard1 = true;
       }
       else if(enable=='Y'){
         this.changeIcCardEnable();
       }
      },
      //获取通行证
      getBuildingListByCompanyId(){
        this._httpPasser(
          'building/getBuildingListByCompanyId',
          'get',
          {companyId:this.companyId.businessExtendShopId},
          data=>{
            this.passerCardList = data.result;
          }
        )
      },
      pagesChange(index) {//分页
        this.searchIcCardParams.pageIndex = index
        this.getIcCardByCondition()
      },
      /*通行客工具方法*/
      /*
      * url 接口方法
      * type 请求方式 get post
      * params请求参数
      * callback200请求成功回调方法
      * isNoDataWarn是否提示空数据，默认提示
      * callback204 请求空数据回调 可以不传
      * */
      _httpPasser(url, type, params, callback200, isNoDataWarn,callback204) {
        //默认提示返回信息为空
        if (typeof isNoDataWarn === 'undefined') {
          isNoDataWarn = true;
        }
        if (type == "get") {
          this.$httpPasser.get(
            url,
            {params: params}
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if(callback204){
                  callback204()
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }
        else if (type == "post") {
          this.$httpPasser.post(
            url,
            params
          ).then(
            (response) => {
              let data = response.data;
              if (data.resultCode == 200) {
                callback200(data)
              }
              else if (data.resultCode == 204) {
                if (isNoDataWarn) {
                  this.$message({
                    showClose: true,
                    message: data.resultCodeDesc,
                    type: 'success'
                  });
                }
                if(callback204){
                  callback204()
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: data.resultCodeDesc,
                  type: 'error'
                });
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        }

      }
    },
    watch:{
      icCardEditParams:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          console.log("b.c: "+val.c, oldVal.c);//但是这两个值打印出来却都是一样的
        },
        deep:true
      }
    },
    computed: {
      isCanUpload: function () {
        let flag = true;
        if (this.fileList.length > 0) {
          flag = false;
        }
        return flag;
      },
      //是否是魔方物业，默认为false。如果是魔方物业，则可以选择系统内所有写字楼
      mofangFlag:function(){
        let re = false;
        if(this.companyId.businessExtendShopId.toString()==='13579'){
          re = true;
        }
        return re;
      },
      num() {
        return parseInt(this.pagetotal)
      }
    },
    created() {
      this.getIcCardByCondition()//初始化获取IC卡
      this.getBuildingListByCompanyId();
      this.getbuildingName();
    },
  }
</script>
<style lang="less" scoped>
  #icCardManager {
    .sex{
      line-height:38px;
    }
    .banner {
      height: 250px;
      background: url("../../../../../assets/img/SalaryManager/ygbanner.png") center center no-repeat;
      .ban-text {
        padding-top: 100px;
        text-align: center;
        color: #fff;
        font-size: 60px;
      }
    }
    .pt50 {
      /* width: 1200px;*/
    }
    .top-title {
      margin-bottom: 20px;
      .line {
        height: 1px;
        background-color: #ccc;
        margin-bottom: -17px;
      }
      .top-text {
        margin-left: 25px;
        font-size: 14px;
        background-color: #fff;
        padding: 0 4px;
        line-height: 30px;
      }
    }
    .main-box {
      .forms-cont {
        padding-bottom: 30px;
        padding-left: 30px;
      }
      .form-item {
        width: 120px;
        margin-right: 15px;
      }
      .btns {
        padding: 20px 20px 20px;
      }
    }
    .entry-cocnt {
      .siteml {
        width: 140px;
        text-align: right;
        margin-right: 10px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      .sitemr {
        width: 217px;
      }
    }
    .pagestyle{
      line-height: 30px;
    }
    .usertype{
      margin-top: 10px;
    }
  }
</style>
<style lang="less">
  #icCardManager{
    .el-dialog__header {
      border-bottom: solid 1px #ccc;
    }
    .el-checkbox+.el-checkbox{
      margin-left:0px;
    }
  }
</style>
