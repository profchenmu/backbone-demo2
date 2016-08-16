<div class="hide">
<p>账户操作安全配置（验证账户管理员）</p>
<p><input id="authority" type="checkbox" <%=authority%>>  打开权限调整时的手机动态码校验</p>
<hr/>
</div>
<p>资金操作安全配置（验证操作员）</p>
<p><input id="sendpoint"  type="checkbox" <%=sendpoint%>> 打开发放福利操作时的手机动态码校验</p>
<p><input id="transfer"  type="checkbox"  <%=transfer%>> 打开资金划拨时的手机动态码校验</p>
<div class="row">
	<div class="col-md-2">
		<button type="button" class="btn btn-default btn-primary"  id="submitBtn">提交保存</button>
	</div>
	<div class="col-md-2" id="auth-message">
	</div>
</div>