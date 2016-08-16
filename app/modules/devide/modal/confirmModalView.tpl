<!-- Modal -->
<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> -->
  <div class="modal-dialog modal-md devide" id="devide-confirm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h5 class="modal-title" id="myModalLabel">划拨确认</h5>
      </div>
      <div class="modal-body">
        目标组织：<span class="red-font"><%= og %></span>个<br>
        本次共将划拨福利资金<span class="red-font"><%=price%></span>元。
      </div>
      <div class="modal-footer">
        <button type="button"  id="confirm-button" class="btn btn-primary">确 认</button>
        <button type="button" class="btn btn-default cancel" data-dismiss="modal">取 消</button>       
      </div>
    </div>
  </div>
<!-- </div> -->