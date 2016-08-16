<div class="search-bar">
	<form class="form" id="search-bar-form">
	  <div class="form-group col-md-4" id="search-nums-group">
	    <label class="control-label" for="search-phone">批次号：</label>
	    <div class="input-group">
	    	<input type="text" class="form-control" id="search-nums" name="nums">
	    </div>
	    
	  </div>


	  <div class="form-group col-md-5 form-group-dates">
			<label class="control-label" >日期：</label>
		    <div class="input-group input-daterange">
			    <input type="text" class="form-control" id="s-date" name="dates" readonly="true">
			    <span class="input-group-addon">to</span>
			    <input type="text" class="form-control" id="e-date" readonly="true">
			</div>
		</div>
	<div class="form-group col-md-2 btn-group">
	  <button type="submit" class="btn btn-default btn-primary" id="search-btn">搜  索</button>
	  <button type="button" class="btn btn-default btn-primary" id="reset-btn">重  置</button>
	  </div>
	  <div class="form-group col-md-1 upload-btn">
	  	<button class="btn btn-default btn-transparent" id="emp-upload">上传</button>
	  </div>
	  <small class="help-block error-a">批次号或日期不能同时为空</small>
	</form>
</div>

<table class="table table-bordered users-table custom-table">
	<thead id="list-header">
		<tr>
			<th class="custom-th">批次号</th>
			<th class="custom-th">导入时间</th>
			<th class="custom-th">导入结果</th>
				<th class="custom-th">操作</th>
		</tr>
	</thead>
	<tbody id="list-detail">
		
	</tbody>
</table>
<div class="table-pagenation"></div>