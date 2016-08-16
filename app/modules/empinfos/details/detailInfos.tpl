<div class="title ellipsis"></div>
<div class="action"></div>
<div class="info-contain">
	<div class="row">
  		<div class="col-sm-6"><p>福利名称：<%= benefitName %></p></div>
  		<div class="col-sm-6"><p>总发放金额：<%= benefitAmount %>元</p></div>
	</div>
	<div class="row">
  		<div class="col-sm-6"><p>提交时间：<%= submitDateStr %></p></div>
  		<div class="col-sm-6"><p>完成时间：<%= successDateStr %></p></div>
	</div>
	<div class="row">
  		<div class="col-sm-12">
  			<p>完成情况：共处理<%= totalNum %>条 &nbsp; 成功：<%= successNum %>条 &nbsp; 失败：<%= failCount %>条</p>
  		</div>
	</div>


</div>