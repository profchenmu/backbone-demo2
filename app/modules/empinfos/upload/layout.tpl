<div class="title-holder"><h5 id="title">员工导入</h5></div>
<div class=""  id="sub-root">
	<form id="emp-upload-form" class="form-horizontal required-validate" enctype="multipart/form-data" name="fileinfo">
		<div class="form-group">
			<label class="control-label col-md-2" >发放操作：</label>
			<div class="col-md-10">
				<input id="lefile" type="file"  class="hide" name="efile">
				<input name="t"  value="01"  type="hidden" >
				<a id="upload-button" class="btn btn-default btn-transparent" ><img src="images/up.png">选择员工文件</a>   
				<a id="download-button"  class="btn btn-default btn-transparent"  href="<%=url%>"><img src="images/down.png">  下载模板文件</a>
				    	<br><br>
				    	发放文件说明：<br>
				    	1、首先下载模板文件<br>
				    	2、填写完成后保存上传（重新上传将覆盖已传文件）<br>
				    	3、仅支持CSV格式上传
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-2" >已传文件：</label>
		    <div id="file-name" class="col-md-10 padding-top7"></div>
		</div>
		<div class="form-group">
			<div class="col-lg-2"></div>
			<div class="col-lg-10">
				<button class="btn btn-default btn-primary" id="user-submit" disabled>提交</button>
			</div>
		</div>
		<div class="form-group">
			<div class="col-lg-2"></div>
			<div class="col-lg-10" id="emp-message"></div>
		</div>
   </form>
</div>