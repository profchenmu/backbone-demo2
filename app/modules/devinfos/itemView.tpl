<td class="table-item custom-td"><%= fundRemitName %></td>
<td class="table-item custom-td"><%= totalAmount %></td>
<td class="table-item custom-td"><%= createdDateStr %></td>

<td class="table-item custom-td">
	
	<% if(status=='00'){ %>
		成功
	<% }else{ %>
		进行中	
	<% } %>

</td>
<td class="table-item custom-td"><%= updatedDateStr %></td>