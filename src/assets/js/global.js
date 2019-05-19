import httpPasser from '@/assets/js/httpPasser'
function getUrl() {
  return httpPasser.get('getHostServer').then(res => {
    if (res.data.resultCode == '200') {
      return {
        gUrl: res.data.result.apiServerHost,
        gImgUrl: res.data.result.picServerHost
      }
    } else {
      return Promise.reject('请求失败')
    }
  }).catch(err => {
    console.log(err)
  })
}

export default getUrl



