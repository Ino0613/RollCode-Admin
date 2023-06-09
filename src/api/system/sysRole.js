import request from '@/utils/request'

const api_name = '/user'

export default {
  /**
 * 获取角色分页列表(带搜索)
 * @param {*} page
 * @param {*} pageSize
 * @param {*} searchObj
 * @returns
 */
  getPageList(page, pageSize, searchObj) {
    return request({
      url: `${api_name}/${page}/${pageSize}`,
      method: 'get',
      // 如果是普通对象参数写法，params:对象参数名
      // 如果是使用json格式传递，data:对象参数名
      params: searchObj
    })
  },

  /**
   * 角色删除
   * @param {*} id
   * @returns
   */
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete',
      params: { id }
    })
  },
  removeByIds(ids) {
    return request({
      url: `${api_name}`,
      method: 'delete',
      params: { ids }
    })
  },
  // 批量删除
  batchRemove(ids) {
    return request({
      url: `${api_name}`,
      method: `delete`,
      params: { ids }
    })
  },
  // remove(ids) {
  //   let url = `${api_name}`
  //   if (Array.isArray(ids)) {
  //     url += '/batch'
  //   } else {
  //     url += `/${ids}`
  //   }
  //   return request({
  //     url,
  //     method: 'delete',
  //     params: { ids }
  //   })
  // },
  /**
   * 角色添加
   * @param {*} user
   * @returns
   */
  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: user
    })
  },

  // 回显要修改的id信息
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  // 修改
  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: user
    })
  },
  // 修改---启用禁用接口
  enableOrDisableUser(params) {
    return request({
      url: '${api_name}',
      method: 'put',
      data: { ...params }
    })
  }
}
