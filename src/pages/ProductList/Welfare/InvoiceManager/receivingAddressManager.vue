<template>
  <div id="receivingAddressManager">
    <div style="padding-top: 30px;">
      <div class="top-title">
        <div class="line"></div>
        <span class="top-text">收货信息管理</span>
      </div>
    </div>
    <el-button type="primary" @click="addAddress">新增地址</el-button>
    <div class="tables" style="margin-top: 20px">
      <el-table :data="addressList" style="width: 100%" :empty-text=text>
        <el-table-column label="收件人" prop="addressee">
        </el-table-column>
        <el-table-column label="联系电话" prop="telephone">
        </el-table-column>
        <el-table-column label="地址" prop="address">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope" @click="toEditBuildingGroup">
            <el-button size="mini" type="primary" @click="editClick(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="deleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix pt20">
      <div class="clearfix">
        <div class="fl">
          <el-pagination @current-change="handleCurrentChange" background :current-page.sync="ConfigureInfo.pageIndex"
                         layout="prev, pager, next" :page-count="ConfigureParams.pageTotal">
          </el-pagination>
        </div>
        <div class="fl pagestyle" style="line-height: 30px;font-size: 12px">
          <span>共{{this.ConfigureParams.pageTotal}}页，当前第{{this.ConfigureInfo.pageIndex}}页,每页30条，共{{this.ConfigureParams.totalRecord}}条</span>
        </div>
      </div>
    </div>
    <div class="mask-box">
      <el-dialog title="新增收货地址" :visible.sync="addAddressdialogVisible" width="810px" :modal-append-to-body="false"
                 :before-close="handleClose">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">选择地区：</div>
            <div class="sitemr fl" style="width: 180px;">
              <el-select v-model="region.province.code" placeholder="请选择省份" @change="getCityByProvince">
                <el-option v-for="province,index in region.provinceList" :key="index" :label="province.name"
                           :value="province.code"></el-option>
              </el-select>
            </div>
            <div class="sitemr fl" style="width: 180px;">
              <el-select v-model="region.city.code" placeholder="请选择市" :disabled="citySelectFlag"
                         @change="getCountryByProvince">
                <el-option v-for="city ,index in region.cityList" :key="index" :label="city.name"
                           :value="city.code"></el-option>
              </el-select>
            </div>
            <div class="sitemr fl" style="width: 180px;">
              <el-select v-model="region.country.areaId" :disabled="countrySelectFlag" placeholder="请选择区">
                <el-option v-for="country ,index in region.countryList" :key="index" :label="country.name"
                           :value="country.areaId"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">详细地址：</div>
            <div class="sitemr fl">
              <el-input v-model="region.address" placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">收件人：</div>
            <div class="sitemr fl">
              <el-input v-model="region.addressee" placeholder="长度不超过25个字符"></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">联系电话：</div>
            <div class="sitemr fl">
              <el-input v-model="region.telephone" placeholder="请输入联系电话"></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
              <span slot="footer" class="dialog-footer fr clearfix" style="padding: 10px 60px 10px 10px">
                <el-button @click="cancleAdd">取 消</el-button>
                <el-button type="primary" @click="sureAddAddress">保 存</el-button>
              </span>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="mask-box">
      <el-dialog title="是否删除" :visible.sync="dialogVisibleDelete" width="500px" :modal-append-to-body="false">
           <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleDelete = false">取 消</el-button>
            <el-button type="primary" @click="sureDelete">确 定</el-button>
          </span>
      </el-dialog>
    </div>
    <div class="mask-box">
      <el-dialog title="编辑收货地址" :visible.sync="editAddressdialogVisible" width="810px" :modal-append-to-body="false"
                 :before-close="handleClose1">
        <div class="entry-cocnt">
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">选择地区：</div>
            <div class="sitemr fl" style="width: 180px;">
              <el-select v-model="region.province.code" placeholder="请选择省份" @change="getCityByProvince">
                <el-option v-for="province,index in region.provinceList" :key="index" :label="province.name"
                           :value="province.code"></el-option>
              </el-select>
            </div>
            <div class="sitemr fl" style="width: 180px;">
              <el-select v-model="region.city.code" placeholder="请选择市" :disabled="citySelectFlag"
                         @change="getCountryByProvince">
                <el-option v-for="city ,index in region.cityList" :key="index" :label="city.name"
                           :value="city.code"></el-option>
              </el-select>
            </div>
            <div class="sitemr fl" style="width: 180px;">
              <el-select v-model="region.country.areaId" :disabled="countrySelectFlag" placeholder="请选择区">
                <el-option v-for="country ,index in region.countryList" :key="index" :label="country.name"
                           :value="country.areaId"></el-option>
              </el-select>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">详细地址：</div>
            <div class="sitemr fl">
              <el-input v-model="region.address" placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">收件人：</div>
            <div class="sitemr fl">
              <el-input v-model="region.addressee" placeholder="长度不超过25个字符"></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
            <div class="siteml beforesiteml fl">联系电话：</div>
            <div class="sitemr fl">
              <el-input v-model="region.telephone" placeholder="请输入联系电话"></el-input>
            </div>
          </div>
          <div class="sitem clearfix">
              <span slot="footer" class="dialog-footer fr clearfix" style="padding: 10px 60px 10px 10px">
                <el-button @click="cancleEdit">取 消</el-button>
                <el-button type="primary" @click="sureAddAddress">保 存</el-button>
              </span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {$gPasserUrl} from '@/assets/js/gUrl'

  export default {
    data() {
      return {
        region: {
          provinceList: [],
          cityList: [],
          countryList: [],
          buildingList: [],
          citySelectFlag: true,
          countrySelectFlag: true,
          //选中的省份
          province: {
            name: '',
            code: ''
          },
          //选中的市
          city: {
            name: '',
            code: ''
          },
          //选中的区
          country: {
            name: '',
            areaId: '',
          },
          shopAddressId: '',
          shopId: this.$local.sefetch('info') ? this.$local.sefetch('info').companyId : '',
          address: '',
          addressee: '',
          telephone: '',
        },
        searchParams: {
          name: '',
          telphone: '',
          startTime: '',
          endTime: '',
          values: '',
          valuess: '',
        },
        addressList: [],
        ConfigureParams: {
          pageIndex: 1, //当前页
          pageSize: 30, //每页条数
          pageTotal: 0, //总页数
          totalRecord: 0, //总条数
        },
        ConfigureInfo: {
          pageTotal: 0,
          pageIndex: 1 //当前页
        },
        text: '正在查询，请稍候',
        dialogVisible: false,
        addAddressdialogVisible: false,
        dialogVisibleDelete: false,
        editAddressdialogVisible: false,
        details: {}
      }
    },
    mounted() {
      this.getProvince()
//      this.getCityByProvince();
//      this.getCountryByProvince();
      this.getAttractInvestmentList()
    },
    methods: {
      handleCurrentChange(index) { //分页方法
        this.ConfigureInfo.pageIndex = index;
        this.getAttractInvestmentList();
      },
      getAttractInvestmentList() {//获取列表
        this.$httpPasser.get("welfareWeb/getAddressListPage", {
          params: {
            shopId: this.region.shopId,
            pageIndex: this.ConfigureInfo.pageIndex,
            pageSize: this.ConfigureParams.pageSize,
          }
        }).then((res) => {
          if (res.data.resultCode == '200') {
            this.addressList = res.data.result
            this.ConfigureParams.totalRecord = res.data.totalRecord
            this.ConfigureParams.pageIndex = res.data.pageIndex
            this.ConfigureParams.pageTotal = res.data.pageTotal
          } else if (res.data.resultCode == '204') {
            this.addressList = [];
            this.text = "暂无数据"
            this.ConfigureParams.totalRecord = res.data.totalRecord
            this.ConfigureParams.pageIndex = res.data.pageIndex
            this.ConfigureParams.pageTotal = res.data.pageTotal
          } else {
            this.$message.success(res.data.resultCodeDesc)
          }
        })
      },
      addAddress() {
        this.addAddressdialogVisible = true;
        console.log('1', this.citySelectFlag)
        console.log('2', this.countrySelectFlag)
      },
      cancleAdd() {
        this.addAddressdialogVisible = false
//        this.clearData()
      },
      cancleEdit() {
        this.editAddressdialogVisible = false
        this.clearData()
      },
      handleClose() {
        this.addAddressdialogVisible = false
        this.clearData()
      },
      handleClose1() {
        this.editAddressdialogVisible = false
        this.clearData()
      },
      clearData() {
        this.region.province = {
          name: '',
          code: ''
        };
        this.region.city = {
          name: '',
          code: ''
        }
        this.region.country = {
          name: '',
          areaId: '',
        }
        this.region.address = ''
        this.region.addressee = ''
        this.region.telephone = ''
        this.region.shopAddressId = ''
      },
      editClick(row) {
        this.editAddressdialogVisible = true
        this.region.shopAddressId = row.shopAddressId
        this.$httpPasser.post("welfareWeb/getAddressDetail", {
          shopAddressId: row.shopAddressId
        }).then((res) => {
          if (res.data.resultCode == '200') {
            this.region.province.code = res.data.result.provinceCode
            this.region.city.code = res.data.result.cityCode
            this.region.country.areaId = res.data.result.countryId
            this.region.address = res.data.result.address
            this.region.addressee = res.data.result.addressee
            this.region.telephone = res.data.result.telephone
            this.getProvince();
            this.getCityByProvince(false);
            this.getCountryByProvince(false);
          }
        })
      },
      deleteClick(row) {
        this.dialogVisibleDelete = true;
        this.region.shopAddressId = row.shopAddressId
      },
      sureDelete() {
        this.$httpPasser.post("welfareWeb/deleteAddress", {
          shopAddressId: this.region.shopAddressId
        }).then((res) => {
          if (res.data.resultCode == '200') {
            this.$message.success("删除成功")
            this.getAttractInvestmentList()
          } else {
            this.$message.error(res.data.resultCodeDesc)
          }
        })
        this.dialogVisibleDelete = false;
        this.getAttractInvestmentList();
      },
      sureAddAddress() {
        if(this.region.country.areaId == ''){
          this.$message.error("请选择地区")
        }else if(this.region.address == ''){
          this.$message.error("请输入详细地址")
        }else if(this.region.addressee==''){
          this.$message.error("请输入收件人")
        }else if ((!/^0?1[3456789]\d{9}$/.test(this.region.telephone))) {
          this.$message.error("请输入正确的手机号")
        } else {
          this.$httpPasser.post("welfareWeb/saveAddress", {
            address: this.region.address,
            addressee: this.region.addressee,
            areaCode: this.region.country.areaId,
            shopAddressId: this.region.shopAddressId,
            shopId: this.region.shopId,
            telephone: this.region.telephone,
          }).then((res) => {
            let data = res.data
            if (data.resultCode == '200') {
              this.$message.success(data.resultCodeDesc)
              this.addAddressdialogVisible = false;
              this.editAddressdialogVisible = false;
              this.$message.success("新增成功")
              this.getAttractInvestmentList()
              this.clearData()
            } else {
              this.$message.error(data.resultCodeDesc)
              this.getAttractInvestmentList()
            }

          })
        }
      },

      //获取省份列表
      getProvince(callBack200) {
        this._httpPasser(
          'area/getArea',
          'get',
          {
            level: 'province',
            areaCode: ''
          },
          (res) => {
            this.region.provinceList = res.result;
          },
        )
      },
      //根据省份ID获取城市列表
      //参数为是否清除下级列表。默认为true;
      getCityByProvince(clearFlag) {
        if (clearFlag === undefined) {
          clearFlag = true;
        }
        this._httpPasser(
          'area/getArea',
          'get',
          {
            level: 'city',
            areaCode: this.region.province.code
          },
          (res) => {
            this.region.cityList = res.result;
            if (clearFlag) {
              this.region.city.code = '';
              this.region.country.areaId = '';
              this.region.flag = false;
            }
          },
        )
      },
      //根据城市ID获取区域列表
      getCountryByProvince(clearFlag) {
        if (clearFlag === undefined) {
          clearFlag = true;
        }
        this._httpPasser(
          'area/getArea',
          'get',
          {
            level: 'country',
            areaCode: this.region.city.code
          },
          (res) => {
            this.region.countryList = res.result;
            if (clearFlag) {
              this.region.country.areaId = '';
              this.region.flag = false;
            }
          },
        )
      },
      _httpPasser(url, type, params, callback200, isNoDataWarn, callback204) {
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
                  callback200(data.result)//2019年1月4日添加 204时清空数据
                }
                if (callback204) {
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
                  callback200(data.result)//2019年1月4日添加 204时清空数据
                }
                if (callback204) {
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
    computed: {
      citySelectFlag: function () {
        console.log('haha', this.region.province.code)
        let re = true;
        if (this.region.province.code != '') {
          re = false;
        }
        return re;
      },
      countrySelectFlag: function () {
        let re = true;
        if (this.region.city.code != '') {
          re = false;
        }
        return re;
      },
    },
  }
</script>

<style lang="less" scoped>
  #receivingAddressManager {
    .entry-cocnt .siteml {
      width: 140px;
      text-align: right;
      margin-right: 10px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .entry-cocnt .sitemr {
      width: 356px;
      line-height: 40px;
    }
    .pagestyle {
      font-size: 12px;
    }
  }
</style>
<style lang="less">
  #receivingAddressManager {
    .el-select {
      width: 174px;
    }
  }
</style>
