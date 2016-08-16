<div class="title-holder">
	<h5 id="title">资金划拨</h5>
</div>
<div class="devide-main main" id="sub-root">
	<form id="devide-form" class="form-horizontal required-validate">
		<div class="form-group ">
			<label class="control-label col-lg-2" >划拨名称：</label>
		    <div class="col-lg-10">
			    <input type="text" class="form-control" id="info"  name="info" placeholder="描述本次划拨的说明。允许1~40个字符">
			</div>
		</div>
		<div class="form-group" id="org-div">
			<label class="control-label col-lg-2" >目标组织：</label>
		    <div class="col-lg-10">
		    	<div id="devide-tree" ></div>
		    	<input type="text"  style="visibility:hidden" id="org" name="org" />
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-2" >费用预估：</label>
		    <div id="predict" class="col-lg-10">
		    	<button type="submit" class="btn btn-default btn-primary" id="submit-btn" disabled>提交划拨</button>
		    	  本次划拨对象为<span id="og-span"  class="red-font">0</span>个组织，预计划拨总额<span id="price-span"class="red-font">0</span>元。  提示：可用福利总额：<span class="red-font" id="fundBalance"></span>元
		    </div>
		</div>
		<input type="hidden" id="phone"/>
		<input type="hidden" id="otp"/>
	</form>
</div>
