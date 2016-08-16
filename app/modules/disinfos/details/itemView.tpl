<td class="table-item custom-td"><%= ecode %></td>
<td class="table-item custom-td"><%= agencyName %></td>
<td class="table-item custom-td"><%= employeName %></td>
<td class="table-item custom-td"><%= amount %></td>
<td class="table-item custom-td">
	<% if(status=='00'){ %>
		<span class="text-green">成功</span>
	<% }else{ %>
		<span class="text-red">失败</span>
		<% if(message!==''){ %>
			<br>
			<span>(<%= message %>)</span>
		<% } %>
	<% } %>
</td>
<td class="table-item custom-td"><%= successTimeStr %></td>