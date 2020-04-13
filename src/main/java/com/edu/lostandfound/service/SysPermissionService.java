package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.SysPermissionMapper;
import com.edu.lostandfound.po.SysPermission;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional(rollbackOn = Exception.class)
public class SysPermissionService {

    @Resource
    private SysPermissionMapper sysPermissionMapper;

    public List<SysPermission> selectListByUser(Integer id) {
        List<SysPermission> sysPermissionList = sysPermissionMapper.selectListByUser(id);
        return sysPermissionList;
    }

    public List<SysPermission> selectListByPath(String requestUrl) {
        return sysPermissionMapper.selectListByPath(requestUrl);
    }
}
