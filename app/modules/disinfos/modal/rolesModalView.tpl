<!-- Modal -->
<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> -->
  <div class="modal-dialog modal-lg" id="change-phone-num-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h5 class="modal-title" id="myModalLabel">发放快照</h5>
      </div>
      <div class="modal-body form-left-30">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-md-2">福利名称：</label>
            <div class="col-md-10"><%= name %></div>
          </div>
          <%if(orgName){%>
          <div class="form-group">
            <label class="col-md-2">目标组织：</label>
            <div class="col-md-10" id="org-pic-div"><%= orgName %></div>
          </div>
          <%}%>
          <%if(job){%>
          <div class="form-group">
            <label class="col-md-2">员工职务：</label>
            <div class="col-md-10"><%= job %></div>
          </div>
          <%}%>
          <%if(gender){%>
          <div class="form-group">
            <label class="col-md-2">性别：</label>
            <div class="col-md-10"><%= gender %></div>
          </div>
          <%}%>
           <%if(joindate){%>
          <div class="form-group">
            <label class="col-md-2">入职日期：</label>
            <div class="col-md-10"><%= joindate %></div>
          </div>
           <%}%>
           <%if(amount){%>
          <div class="form-group">
            <label class="col-md-2">福利金额：</label>
            <div class="col-md-10"><%= amount %>元</div>
          </div>
          <%}%>
          <%if(orgname){%>
          <div class="form-group">
            <label class="col-md-2">已传文件：</label>
            <div class="col-md-10">
				<a href='<%=url%>'><%=orgname%></a>
			</div>
          </div>
          <%}%>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">确 认</button>
      </div>
    </div>
  </div>
<!-- </div> -->

