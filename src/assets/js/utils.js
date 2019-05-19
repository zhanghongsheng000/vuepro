let local = {
  save(key, value) {//添加
    localStorage.setItem(key, JSON.stringify(value))
  },
  fetch(key) {//读取
    return JSON.parse(localStorage.getItem(key)) || {}
  },
  sesave(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  sefetch(key) {
    return JSON.parse(sessionStorage.getItem(key)) || {}
  },
  //获取当前日期
  getDay(formString) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let re = '';
    if (formString) {
      formString = formString.replace('yyyy', year);
      formString = formString.replace('MM', month);
      formString = formString.replace('dd', strDate);
      re = formString;
    }
    else {
      console.error('getDay方法（获取当前日期）需要一个格式参数，形如"yyyy-MM-dd"')
    }
    return re;
  },

  //格式化日期
  //将格式化的日期转换为字符串，参数1为时间字符串，参数2为原始时间格式,参数3为期待的格式。
  //时间格式形如：yyyy年MM月dd日
  editFormOfDate(date, originalForm, targinForm) {
    let formSon1 = originalForm.split('yyyy')[0];
    let formSon2 = originalForm.split('yyyy')[1].split('MM')[0];
    let formSon3 = originalForm.split('yyyy')[1].split('MM')[1].split('dd')[0];
    let formSon4 = originalForm.split('yyyy')[1].split('MM')[1].split('dd')[1];
    if (formSon1 != '' && formSon1 != formSon2) {

    }
    return date;
  },
  //反格式化时间
  editFromOfTime() {
  },
  //设置日期段显示文字
  setDateSegment(startDate, endDate) {
    //开始设置需要显示的日期
    let tempStartDate = ''
    let tempEndDate = ''
    if (startDate !== '' && startDate !== null) {
      tempStartDate = startDate.split('-')[0] + '年' + startDate.split('-')[1] + '月' + startDate.split('-')[2] + '日'
    }
    //有结束日期
    if (endDate !== '' && endDate !== null) {
      tempEndDate = endDate.split('-')[0] + '年' + endDate.split('-')[1] + '月' + endDate.split('-')[2] + '日'
    }
    let re = this.getDay('yyyy年MM月dd日')
    if (tempStartDate !== '' || tempEndDate !== '') {
      if (tempStartDate !== '' && tempEndDate === '') {
        re = '自' + tempStartDate + '以后';
      }
      else if (tempStartDate === '' && tempEndDate !== '') {
        re = '截止' + tempEndDate;
      }
      else if (tempStartDate !== '' && tempEndDate !== '') {
        re = tempStartDate + '到' + tempEndDate;
      }
    }
    console.log(re)
    return re;
  },
  //检验手机号码格式
  checkPhoneNum(phone) {
    let re = true;
    if (!(/^1[345789]\d{9}$/.test(phone))) {
      re = false;
    }
    return re;
  },

  //检验身份证格式
  checkIdCard(icCard) {
    let reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    let re = true;
    if (reg.test(icCard)) {
      re = true;
    } else {
      re = false;
    }
    return re;
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
  _httpPasser(url, type, params, callback200, isNoDataWarn, callback204, callBackAnyCode) {
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
          if (callBackAnyCode) {
            callBackAnyCode()
          }
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
          if (callBackAnyCode) {
            callBackAnyCode()
          }
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

  },

  /*
  * 将根据父级ID来分级的对象数组转化为分层结构的对象数组
  * 参数【originalData】为原始对象数组  参数【rootId】根据跟层级的父级ID，默认为0
  * 参数【parentIdName】为原始对象中父级ID的属性名称。如果不传,则默认为parentSqlId。
  * 参数【idName】为原始对象中自己ID的属性名称。如果不传，则默认为sqlId。
  * 参数【childrenName】为原始对象中自己子级数组的属性名称。如果不传，则默认为children。
  * 参数【arrtKeyValueArray】为需要转化的属性的键值对。
  * 例如[{a:b},{c:d}{e:f}]表示，originalData中的b,d,f三个属性，转化完成后在新对象的中的名字为a,c,e
  * 这个参数可以不传，一旦不传，将不对属性值进行任何修改。
  * */
  changeMeauDataStructure(originalData, rootIdValue, parentIdName, idName, childrenName, arrtKeyValueArrayParam) {
    let currentScalArray = [];
    let nextScalArray = [];
    let parentIdValue = rootIdValue ? rootIdValue : 0;
    let parentId = parentIdName ? parentIdName : 'parentSqlId';
    let id = idName ? idName : 'sqlId';
    let children = childrenName ? childrenName : 'children'
    let arrtKeyValueArray = arrtKeyValueArrayParam ? arrtKeyValueArrayParam : false;
    for (let o in originalData) {
      if (originalData[o][parentId] == parentIdValue) {
        var tempC = {};
        if (arrtKeyValueArray) {
          tempC[parentIdName] = originalData[o][parentIdName];
          tempC[idName] = originalData[o][idName]
          for (let attrName in arrtKeyValueArray) {
            tempC[attrName] = originalData[o][arrtKeyValueArray[attrName]];
          }
        }
        else {
          for (let attrOriginalName in originalData[o]) {
            tempC[attrOriginalName] = originalData[o][attrOriginalName];
          }
        }
        currentScalArray.push(tempC)
      }
      else {
        nextScalArray.push(originalData[o])
      }
    }
    for (let c in currentScalArray) {
      currentScalArray[c][children] = this.changeMeauDataStructure(nextScalArray, currentScalArray[c][id], parentId, id, children, arrtKeyValueArray)
    }
    return currentScalArray;
  },

//操作数组对象
  /*
  * 根据属性名称，获取objArray中是否存在obj。如果存在返回对象在数组中的索引，不存在则返回false
  * objArray对象数组
  * obj进行对比的对象
  * attrNameArray，关键属性名称数组，如果不传，则默认obj中的全部属性都为关键属性。
  * 关键属性中，任意一项属性不相等，则返回false
  * */
  operateObjArray(objArray, obj, attrNameArray) {
    let re = true;
    if (objArray && objArray.length != undefined) {
      if (objArray.length > 0) {
        for (let o in objArray) {
          re = true;
          if (attrNameArray && attrNameArray.length) {
            for (let attr in attrNameArray) {
              if (obj[attrNameArray[attr]]) {
                if (objArray[o][attrNameArray[attr]] != undefined && objArray[o][attrNameArray[attr]] == obj[attrNameArray[attr]]) {
                  continue;
                } else {
                  re = false;
                  break;
                }
              } else {
                console.error("operateObjArray方法错误：参数'attrNameArray'中的属性，在obj不存在")
              }
            }
            if (re) {
              re = o;
              break;
            }
          } else {
            for (let p in obj) {
              if (objArray[o][p] != undefined && obj[p] == objArray[o][p]) {
                continue;
              }
              else {
                re = false;
                break;
              }
            }
            if (re) {
              re = o;
              break;
            }
          }
        }
      }
      else {
        re = false;
      }
      return re;
    }
    else {
      console.error("operateObjArray方法错误：参数'objArray'不存在或者不是数组类型")
    }
  }
}
export const $local = local
export default {
  install: function (vm) {
    vm.prototype.$local = local
  }
}

