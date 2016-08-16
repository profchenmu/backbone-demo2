<div class="search-bar">
	<form class="form-inline" id="search-bar-form">
	  <div class="form-group">
	    <label class="" for="search-username">登录账号：</label>
	    <input type="text" class="form-control" id="search-username" name="name">
	  </div>
	  <div class="form-group">
	    <label class="" for="search-phone">手机号：</label>
	    <input type="text" class="form-control" id="search-phone" name="phone">
	  </div>
	  <button type="submit" class="btn btn-default btn-primary" id="search-btn">搜  索</button>
	  <button type="button" class="btn btn-default btn-primary" id="reset-btn">重  置</button>

	  	<% if(addUserBtn){ %>
	  		<button type="button" id="addUser" class="btn btn-default btn-transparent pull-right" >+  新增操作员</button>
		<% } %>
	  
	</form>
</div>
<table class="table table-bordered users-table custom-table">
	<thead id="list-header">
		<tr>
			<th class="custom-th">登录账号</th>
			<th class="custom-th">手机号码</th>
			<th class="custom-th">更新时间</th>
			<th class="custom-th">状态</th>
			<th class="custom-th">操作</th>
		</tr>
	</thead>
	<tbody id="list-detail">
		
	</tbody>
</table>
<!-- <div class="loading">正在加载...</div>
<div class="no-content">暂无数据</div> -->
<div class="table-pagenation2"></div>