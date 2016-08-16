<div class="modal-dialog modal-md" id="edit-password-modal" role="document">
	<div class="modal-content">
		<div class="modal-header">
        	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	<h5 class="modal-title" id="myModalLabel">修改密码</h5>
      	</div>
      	<div id="edit-modal-body">
        	<form id="edit-password-form">
	        	<div class="form-group">
		        	<label class="control-label  col-md-4">原密码：</label>
		        	<div class="col-md-8">
		            	<input type="password"  name="old-password" id="old-password" class="form-control ">
		            </div>
		     	</div>
	        	<div class="form-group">
		        	<label class="control-label col-md-4">修改密码：</label>
		        	<div class="col-md-8">
			            <input type="password"  name="new-password" id="new-password" class="form-control">
		            </div>
		     	</div>
	        	<div class="form-group">
		        	<label class="control-label col-md-4">确认密码：</label>
		        	<div class="col-md-8">
			            <input type="password"  name="confirm-password" id="confirm-password" class="form-control">
		            </div>
		     	</div>
		       	<div class="form-group">
		        	<label class="control-label col-md-4">图形验证码：</label>
		        	<div class="col-md-8">
			       		<input type="text" name="code" id="code" class="form-control">
			       		<img id="image-auth" src="asdfs" width="60" height="30"><a href="javascript:;" id="reload-img">点击刷新</a>
		       		</div>
		    	</div>
	           	<div class="modal-footer">
	            	<button type="submit" class="btn btn-primary" id="edit-password-button">确 认</button>
	            	<button type="button" class="btn btn-default cancel" data-dismiss="modal">取 消</button>       
	          	</div>
        	</form>
		</div>
	</div>
</div>