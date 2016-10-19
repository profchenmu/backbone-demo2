<div class="title-holder"><h5 id="title">新增操作员</h5></div>
<div class="manage"  id="sub-root">
	<form id="add-user-form" class="form-horizontal required-validate">
		<div class="form-group ">
			<label class="control-label col-lg-2" >操作员账户：</label>
		    <div class="col-lg-4">
			    <input type="text" class="form-control" id="user-name"  name="user-name" placeholder="允许最多18位数字，字母，符号">
			</div>
		</div>
        <div class="form-group">
            <label class="control-label col-lg-2" >操作员手机号：</label>
            <div class="col-lg-4">
			    <input type="text" class="form-control" id="phone"  name="phone">
			</div>
		</div>
        <div class="form-group" id="code-div">
            <label class="control-label col-lg-2" >图形验证码：</label>
            <div class="col-lg-6">
           <p><input type="text"  class="form-control"  id="check-code"  size="7">   <img id="image-auth" >看不清？<a href="javascript:;" id="reload-img">点击刷新</a><input type="hidden" id="timestamp"><input type="text"  class="hidden-input"  id="code"  name="code" /> </p>
           
            </div>
        </div>
		<div class="form-group" >
			<label class="control-label col-lg-2" >数据权限：</label>
			<div class="col-lg-10">
				<div id="org-tree" ></div>
				<input type="text"  class="hidden-input"   id="org" name="org" />
			</div>
		</div>
		<div class="form-group" >
			<label class="control-label col-lg-2" >页面和按钮权限：</label>
			<div class="col-lg-10">
				<div id="menu-tree"></div>
           		<input type="text"  class="hidden-input"  id="menu" name="menu" />
           	</div>
		</div>
		<div class="form-group">
			<div class="col-lg-2"></div>
			<div class="col-lg-10">
				<button type="submit" class="btn btn-default btn-primary" id="auth-manage-save">提交创建</button>
			</div>
		</div>
   </form>
</div>