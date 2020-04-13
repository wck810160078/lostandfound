package com.edu.lostandfound.service;

import java.util.ArrayList;    
import java.util.List;

import com.edu.lostandfound.po.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 需要实现UserDetailsService接口
 * 因为在Spring Security中配置的相关参数需要是UserDetailsService类型的数据
 * */
@Service
public class UserService implements UserDetailsService{

	@Resource
	private SysUserService sysUserService;

	@Resource
	private SysPermissionService sysPermissionService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (username == null || "".equals(username)) {
			throw new RuntimeException("用户不能为空");
		}
		//根据用户名查询用户
		SysUser sysUser = sysUserService.selectByName(username);
		if (sysUser == null) {
			throw new RuntimeException("用户不存在");
		}
		List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		if (sysUser != null) {
			//获取该用户所拥有的权限
			List<SysPermission> sysPermissions = sysPermissionService.selectListByUser(sysUser.getId());
			// 声明用户授权
			sysPermissions.forEach(sysPermission -> {
				GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(sysPermission.getPermissionCode());
				grantedAuthorities.add(grantedAuthority);
			});
		}
		return new User(sysUser.getUserName(), sysUser.getPassword(), sysUser.getEnabled(), sysUser.getNotExpired(), sysUser.getCredentialsNotExpired(), sysUser.getAccountNotLocked(), grantedAuthorities);
	}

}
