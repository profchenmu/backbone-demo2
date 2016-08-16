<td class="table-item custom-td userName"><%= userName %></td>
<td class="table-item custom-td phone"><%= phone %></td>
<td class="table-item custom-td updatedDate"><%= updateDate %></td>
<td class="table-item custom-td">
	<% if(stat==1){ %>
		已启用
	<% }else{ %>
		已禁用
	<% } %>
</td>
<td class="table-item custom-td">
	
	<% if(destroyBtn){ %>
		<a class="table-action" id="user-ban" href="javascript:;">
			<% if(stat==1){ %>
				禁用
			<% }else{ %>
				启用
			<% } %>
		</a>
	<% } %>
	
	<a class="table-action" id="change-phone" href="javascript:;">
		<% if(changePhoneBtn){ %>
			修改手机
		<% } %>
	</a>
	<!-- <a class="table-action" id="change-password" href="javascript:;">密码设置</a> -->
	<a class="table-action" id="change-auth" href="javascript:;">
		<% if(changeAuthBtn){ %>
			权限管理
		<% } %>
	</a>
</td>