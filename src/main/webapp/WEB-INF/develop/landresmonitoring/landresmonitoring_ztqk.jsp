<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html>

	<div class="left_data">
		<div class="panel panel-primary" style="margin-bottom: 0px; height: 100%">
			<div class="panel-heading">${name}</div>
			<ul id="tree" class="ztree" style="height: 94%; calc (100% - 30px); overflow-y: auto;"></ul>
		</div>
	</div>

	<div class="main_data">
		<div onchange="radiochange()" class="btn-group" data-toggle="buttons" style="padding: 5px;">
			<label class="btn btn-primary  active">
				<input type="radio" name="options" id="option1" autocomplete="off" value="1" checked="checked"> 数据采集情况
			</label>
			<label class="btn btn-primary">
				<input type="radio" name="options" id="option2" autocomplete="off" value="2"> 影像生产情况
			</label>
			<label class="btn btn-primary">
				<input type="radio" name="options" id="option3" autocomplete="off" value="3"> 监测图斑情况
			</label>
		</div>
		<div class="main_body">
			<div class="panel-body">
				<div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
					<div class="row">
						<div class="col-xs-6 panel-box">
							<div class="row">
								<div style="height: 250px;width: 100%;">
									<blockquote>
										<p id="text">2017年第三期监测，影像采集时间范围是2017-10-15至2017-11-15，共采集原始标准影像***景共***GB，主要数据源及补充数据源的总体采集情况如下图所示，全国有效覆盖率达到**%。</p>
									</blockquote>
								</div>
							</div>
						</div>
						<div class="col-xs-6 panel-box">
							<div class="row">
								<div id="chart" style="height: 250px;width: 100%;"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 panel-box">
							<div class="row">
								<div id="map" class=""></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 panel-box">
							<div class="row">
								<table id="table"></table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
