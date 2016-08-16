<td class="table-item custom-td"><%= batchId %></td>
<td class="table-item custom-td"><%= createdDateStr %></td>

<td class="table-item custom-td">
	<%= processMessage %>
</td>
<% if(showDetail){ %>
<td class="table-item custom-td">
	<a class="table-action show-details" href="#empinfo/detail/<%= batchId %>?time=<%= createdDateStr %>">查看详情</a>
</td>
<% } %>
