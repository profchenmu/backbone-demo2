<div class="modal-dialog modal-md "   role="document">
	<div class="modal-content">
		<div class="modal-header">
        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	<h5 class="modal-title" id="myModalLabel">安全验证</h5>
      	</div>
      	<div class="modal-body">
       	 当前验证的手机号为：<%=phone%><br/><br/>
        验证码：<input type="text"  id="otp-code"  size="10"/>  <button type="button"  id="code-button" class="btn">获取短信验证码</button>
      	</div>
      	<div class="modal-footer">
        	<button type="button"  id="confirm-button" class="btn btn-primary">确 认</button>
        	<button type="button" class="btn btn-default cancel" data-dismiss="modal">取 消</button>       
     	</div>
	</div>
</div>