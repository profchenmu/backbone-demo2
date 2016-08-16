<td class="table-item custom-td"><%= benefitName %></td>
<td class="table-item custom-td"><%= benefitAmount %></td>
<td class="table-item custom-td"><%= submitDateStr %></td>

<td class="table-item custom-td">
	<% if(status==='00'||status==='02'){ %>
		已完成<br>
		共处理<%= totalNum %>条<br>
		<span class="text-green">成功:<%= sucNum %>条，</span>
		<span class="text-red">失败:<%= failCount %>条</span>	
	<% }else if(status==='01'){ %>
		失败
	<% }else{ %>
		进行中	
	<% } %>
</td>

<td class="table-item custom-td"><%= successDateStr %></td>
<td class="table-item custom-td">
	<a class="table-action" id="show-roles" href="javascript:;"><%= showRoles ? '查看规则明细' : '' %></a><br>
	<% if(status=='00' || status==='02' || status==='01' && showDetails){ %>
		<a class="table-action" id="show-details" href="#disinfos/detail/<%= id %>">查看发放详情</a>
	<% } %>
</td>