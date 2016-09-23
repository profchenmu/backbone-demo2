<div class="title-holder">
	<h5 id="title">福利发放</h5>
</div>
<div class="main distribute-main" id="sub-root">
  <ul class='nav nav-tabs'>
  	<% if(btn1){ %>
  		<li class='active'><a href='#tab1' data-toggle='tab'>按筛选条件发放</a></li>
  	<% } %>
    <% if(btn2){ %>
    	<li class=<%= btn1 ? '' : 'active' %>><a href='#tab2' data-toggle='tab'>按文件发放</a></li>
    <% } %>
    
  </ul>
  <div class='tab-content'>
  	<% if(btn1){ %>
		<div class='tab-pane active' id='tab1'>
			<form id="distribute1-form" class="form-horizontal required-validate">
				<div class="form-group ">
					<label class="control-label col-md-2" >福利名称：</label>
				    <div class="col-md-10">
					    <input type="text" class="form-control"  id="info" name="info" placeholder="请输入本次福利的名称，如“2016全公司端午节福利”。允许1~40个字符。" maxlength="40">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >目标组织：</label>
					<div class="col-md-10">
						<div id="depart-tree" ></div>
					    <input type="text"  style="visibility:hidden" id="org" name="org" />
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >员工职务：</label>
					<div id="rolediv" class="col-md-10 chosen-container chosen-container-multi">
			            <select id="role-select" class="form-control chosen-select " multiple>
			            </select>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >性别：</label>
				    <div class="col-md-2">
						<select class="form-control"  id="gender" name="gender" >
			                <option value="" >全部</option>
			            </select>
				    </div>
				</div>
				<div class="row">
					<label class="control-label col-md-2" >入职日期：</label>
				    <div class="input-group date col-md-2 padding-left15 float-left">
					  <input id="join-date" type="text" class="input-date" readonly="readonly"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span> 
					</div>
					<div class="col-md-2 padding-top7">之前入职</div>
				</div>
				<div id="benifit-div" class="form-group">
					<label class="control-label col-md-2" >福利金额：</label>
				    <div class="col-md-10">
				    	<input type="text" id="price" name="price" class="input-number"> 元/人
				    </div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >费用预估：</label>
				    <div id="predict" class="col-md-10">
				    	<button type="submit"  class="btn btn-default btn-transparent" id="cal-btn"><img src="images/cal.png">  点击计算</button>
				    	  <div class="hide"  id="cal-result">本次福利共涉及<span id="people-count" class="red-font">0</span>人，预计发放总额<span id="budget-amt"class="red-font">0</span>元。</div>
				    	  提示：可用福利总额：<span class="red-font"  id="fund-balance"></span>元<br><br>
				    	<button type="button" class="btn btn-default btn-primary" id="submit-btn" disabled>提交发放</button> 
				    </div>
				</div>
			</form>
		</div>
	<% } %>
	<% if(btn2){ %>
		<div class='tab-pane <%= btn1 ? "" : "active" %>' id='tab2'>
			<form  id="distribute2-form"  class="form-horizontal" enctype="multipart/form-data" name="fileinfo">
				<div class="form-group ">
					<label class="control-label col-md-2" >福利名称：</label>
				    <div class="col-md-10">
					    <input type="text" class="form-control" id="info2" name="info2" placeholder="请输入本次福利的名称，如“2016全公司端午节福利”。允许1~40个字符。">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >发放操作：</label>
					<div class="col-md-10">
						<input id="lefile" type="file"  class="hide" name="efile">
						<input id="upload-file" type="hidden" >
						<input id="orgname" type="hidden" >
						<a id="upload-button" class="btn btn-default btn-transparent" ><img src="/images/up.png">  上传发放文件</a>
				    	<a target="_blank" id="download-button"  class="btn btn-default btn-transparent"  href="<%=url%>"><img src="images/down.png">  下载模板文件</a>
				    	<br><br>
				    	发放文件说明：<br>
				    	1、首先下载模板文件<br>
				    	2、在模板文件的第一列填写“员工编号”，第二列填写“福利金额”（元）<br>
				    	3、填写完成后上传（重新上传将覆盖已传文件）
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >已传文件：</label>
				    <div id="file-name" class="col-md-10 padding-top7"></div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2" >费用预估：</label>
				    <div id="predict" class="col-md-10">
				    	<button type="submit" class="btn btn-default btn-transparent" id="cal2-btn"><img src="images/cal.png">  点击计算</button> 
				    	<div class="hide"  id="cal-result2">本次福利共涉及<span id="people-span" class="red-font">0</span>人，预计发放总额<span id="total-span" class="red-font">0</span>元。  </div>
				    	提示：可用福利总额：<span class="red-font" id="fund-balance2">0</span>元<br><br>
				    	<button type="button" class="btn btn-default btn-primary" id="submit2-btn" disabled>提交发放</button> 
				    </div>
				</div>
			</form>			
		</div>
	<% } %>
	</div>
</div>