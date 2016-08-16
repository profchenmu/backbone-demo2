<div class="title ellipsis"></div>
<div class="action"></div>
<div class="info-contain">
	<p class="title">您好，亲爱的<%= rootAgencyName %>用户，欢迎使用企业福利发放系统！</p>
	<div class="row">
  		<div class="col-sm-6"><p>当前账号：<%= userName %></p></div>
  		<div class="col-sm-6"><p>账号类型：<%= adminFlag==='1'?'管理员':'操作员' %></p></div>
	</div>
	<div class="row">
  		<div class="col-sm-6"><p>所属二级组织：<%= agencyName %></p></div>
  		<div class="col-sm-6"><p>所辖员工数：<%= currentEmploye %></p></div>
	</div>


</div>
<div class="detain-contain">
	<div class="row">
		<div class="col-sm-4 money-left">
			<div class="money-inner">
				<div class="money-in">
					<p class="text-left">可用福利余额：</p>
					<h3 class="text-right money-title"><%= fundBalance %><small>元</small></h3>
				</div>
			</div>
		</div>
		<div class="col-sm-4 money-devided">
			<div class="money-inner">
				<div class="money-in">
					<p class="text-left">已发放福利总额：</p>
					<h3 class="text-right money-title"><%= totalWelfare %><small>元</small></h3>
				</div>
			</div>
		</div>
		<div class="col-sm-4 money-distributed">
			<div class="money-inner">
				<div class="money-in">
					<p class="text-left">已划拨福利总额：</p>
					<h3 class="text-right money-title"><%= totalRemit %><small>元</small></h3>
				</div>
			</div>
		</div>
	</div>
</div>

