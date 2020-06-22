function validateVariable(variable) {
	if (variable === undefined || variable === null) {
		return "";
	} else {
		return variable;
	}
}

function checkRecordIfExists(conn, tableName, FieldName, Value) {
	try {
		var ret = {};
		var pstmt = conn.prepareStatement("select count(*) from " + tableName + " where " + FieldName + " = ?");
		pstmt.setString(1, Value);
		var rs = pstmt.executeQuery();
		var result;
		while (rs.next()) {
			result = rs.getString(1);
		}
		rs.close();
		pstmt.close();
		ret.statusState = "success";
		ret.result = parseInt(result, 10);
		return ret;
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function checkIfRecordAlreadyExistsScenario(conn, tableName, API_ID, SCENARIO_NAME) {
	try {
		var ret = {};
		var pstmt = conn.prepareStatement("select count(*) from " + tableName + " where API_ID = ? and SCENARIO_NAME = ?");
		pstmt.setString(1, API_ID);
		pstmt.setString(2, SCENARIO_NAME);
		var rs = pstmt.executeQuery();
		var result;
		while (rs.next()) {
			result = rs.getString(1);
		}
		rs.close();
		pstmt.close();
		ret.statusState = "success";
		ret.statusText = "";
		ret.result = parseInt(result, 10);
		return ret;
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function checkIfRecordAlreadyExistsNonScenario(conn, tableName, recordID) {
	try {
		var ret = {};
		var pstmt = conn.prepareStatement("select count(*) from " + tableName + " where API_ID = ?");
		pstmt.setString(1, recordID);
		var rs = pstmt.executeQuery();
		var result;
		while (rs.next()) {
			result = rs.getString(1);
		}
		rs.close();
		pstmt.close();
		ret.statusState = "success";
		ret.result = parseInt(result, 10);
		return ret;
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function prepareStatementSetString(conn, queryString, JSONObJ) {
	var st = conn.prepareStatement(queryString);
	st.setString(1, validateVariable(JSONObJ.TITLE));
	st.setString(2, validateVariable(JSONObJ.DESCRIPTION));
	st.setString(3, validateVariable(JSONObJ.HOSTED_SYSTEM));
	if (validateVariable(JSONObJ.PUBLISHED_ON) === "") {
		st.setNull(4, null);
	} else {
		st.setTimestamp(4, new Date(JSONObJ.PUBLISHED_ON));
	}
	if (validateVariable(JSONObJ.RELEASE_DATE) === "") {
		st.setNull(5, null);
	} else {
		st.setTimestamp(5, new Date(JSONObJ.RELEASE_DATE));
	}
	st.setString(6, validateVariable(JSONObJ.API_VERSION));
	st.setString(7, validateVariable(JSONObJ.API_VENDOR));
	st.setString(8, validateVariable(JSONObJ.API_MODE));
	st.setString(9, validateVariable(JSONObJ.PROCESS_AREA));
	st.setString(10, validateVariable(JSONObJ.GET_REQUEST_ENABLED));
	st.setString(11, validateVariable(JSONObJ.PUT_REQUEST_ENABLED));
	st.setString(12, validateVariable(JSONObJ.POST_REQUEST_ENABLED));
	st.setString(13, validateVariable(JSONObJ.DELETE_REQUEST_ENABLED));
	st.setString(14, validateVariable(JSONObJ.CUSTOMFIELD_1));
	st.setString(15, validateVariable(JSONObJ.CUSTOMFIELD_2));
	st.setString(16, validateVariable(JSONObJ.CUSTOMFIELD_3));
	st.setString(17, validateVariable(JSONObJ.CUSTOMFIELD_4));
	st.setString(18, validateVariable(JSONObJ.CUSTOMFIELD_5));
	st.setString(19, validateVariable(JSONObJ.RELEASE_STATUS));
	st.setString(20, validateVariable(JSONObJ.API_ID));
	
	return st;
}

function updateApiInformationRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."API_INFO" SET  TITLE = ?, DESCRIPTION = ?,	HOSTED_SYSTEM = ?,';
			queryString = queryString + ' PUBLISHED_ON = ?, RELEASE_DATE = ?, API_VERSION  = ?, API_VENDOR = ?, API_MODE = ?,';
			queryString = queryString + ' PROCESS_AREA = ?, GET_REQUEST_ENABLED = ?, PUT_REQUEST_ENABLED = ?, POST_REQUEST_ENABLED = ?,';
			queryString = queryString +
				' DELETE_REQUEST_ENABLED = ?, CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ?, RELEASE_STATUS = ? WHERE API_ID = ?';
			var st = prepareStatementSetString(conn, queryString, JSONObJ);
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
			ret.statusState = "error";
			ret.statusText = "API with ID " + JSONObJ.API_ID + " does not exists";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateApiOverviewRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_OVERVIEW"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."API_OVERVIEW" SET  TITLE = ?, DESCRIPTION = ?,';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.TITLE));
			st.setString(2, validateVariable(JSONObJ.DESCRIPTION));
			st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(8, validateVariable(JSONObJ.API_ID));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
			ret = $.API.lib.commonFunctions.createApiOverviewRecord(conn, JSONObJ);
			//ret.statusState = "error";
			//ret.statusText = "Record does not exists with api id : " + JSONObJ.API_ID + " in Api Overview Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateApiProxyEndPointRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_PROXY_END_POINT"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."API_PROXY_END_POINT" SET  NAME = ?, VALUE = ?,';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.NAME));
			st.setString(2, validateVariable(JSONObJ.VALUE));
			st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(8, validateVariable(JSONObJ.API_ID));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
		    ret = $.API.lib.commonFunctions.createApiProxyEndPointRecord(conn, JSONObJ);
// 			ret.statusState = "error";
// 			ret.statusText = "Record does not exists with api id : " + JSONObJ.API_ID + " in Api proxy end point Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateApiTargetEndPointRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_TARGET_END_POINT"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."API_TARGET_END_POINT" SET  TITLE = ?, URL = ?,';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.TITLE));
			st.setString(2, validateVariable(JSONObJ.URL));
			st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(8, validateVariable(JSONObJ.API_ID));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
		    ret = $.API.lib.commonFunctions.createApiTargetEndPointRecord(conn, JSONObJ);
// 			ret.statusState = "error";
// 			ret.statusText = "Record does not exists with api id : " + JSONObJ.API_ID + " in Api target end point Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateApiTestScenarioRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsScenario(conn, '"API_MANAGEMENT"."API_TEST_SCENARIOS"', JSONObJ.API_ID, JSONObJ.SCENARIO_NAME);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."API_TEST_SCENARIOS" SET API_URL = ?,';
			queryString = queryString + ' API_REQUEST_BODY = ?, API_RESPONSE_CONTENT = ?, API_HTTP_METHOD = ?,';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ? and SCENARIO_NAME = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.API_URL));
			st.setString(2, validateVariable(JSONObJ.API_REQUEST_BODY));
			st.setString(3, validateVariable(JSONObJ.API_RESPONSE_CONTENT));
			st.setString(4, validateVariable(JSONObJ.API_HTTP_METHOD));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(9, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(10, validateVariable(JSONObJ.API_ID));
			st.setString(11, validateVariable(JSONObJ.SCENARIO_NAME));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
			ret.statusState = "error";
			ret.statusText = "Record does not exists with api id " + JSONObJ.API_ID + " and Test scenario name " + JSONObJ.SCENARIO_NAME +
				" in test scenario Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateScpApiDetailsRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."SCP_API_MANAGEMANT_DETAILS"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."SCP_API_MANAGEMANT_DETAILS" SET SCP_TENANT = ?, URL = ?, ';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.SCP_TENANT));
			st.setString(2, validateVariable(JSONObJ.URL));
			st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(8, validateVariable(JSONObJ.API_ID));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
		    ret = $.API.lib.commonFunctions.createScpApiDetailsRecord(conn, JSONObJ);
// 			ret.statusState = "error";
// 			ret.statusText = "Record does not exists with api id : " + JSONObJ.API_ID + " in SCP Api management details Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateBackEndDetailsRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."BACKEND_DEVELOPMENT_DETAILS"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."BACKEND_DEVELOPMENT_DETAILS" SET FM_NAME = ?, FUNCTION_GROUP = ?, ';
			queryString = queryString + 'ABAP_CLASS_NAME = ?, TRANSPORT = ?, ';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.FM_NAME));
			st.setString(2, validateVariable(JSONObJ.FUNCTION_GROUP));
			st.setString(3, validateVariable(JSONObJ.ABAP_CLASS_NAME));
			st.setString(4, validateVariable(JSONObJ.TRANSPORT));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(9, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(10, validateVariable(JSONObJ.API_ID));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
		    ret = $.API.lib.commonFunctions.createBackEndDetailsRecord(conn, JSONObJ);
// 			ret.statusState = "error";
// 			ret.statusText = "Record does not exists with api id : " + JSONObJ.API_ID + " in Backend development details Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateMiddleWareDetailsRecord(conn, JSONObJ) {
	try {
		var ret = {};
		var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."MIDDLEWARE_DEVELOPMENT_DETAILS"', JSONObJ.API_ID);
		if (recordExistsResult.statusState === "error") {
			return recordExistsResult;
		}
		if (recordExistsResult.result === 1) {
			var queryString = 'UPDATE "API_MANAGEMENT"."MIDDLEWARE_DEVELOPMENT_DETAILS" SET IFLOW_NAME = ?, POST = ?, ';
			queryString = queryString +
				' CUSTOMFIELD_1 = ?, CUSTOMFIELD_2 = ?, CUSTOMFIELD_3 = ?, CUSTOMFIELD_4 = ?, CUSTOMFIELD_5  = ? WHERE API_ID = ?';
			var st = conn.prepareStatement(queryString);
			st.setString(1, validateVariable(JSONObJ.IFLOW_NAME));
			st.setString(2, validateVariable(JSONObJ.POST));
			st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_1));
			st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_2));
			st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_3));
			st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_4));
			st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_5));
			st.setString(8, validateVariable(JSONObJ.API_ID));
			st.execute();
			ret.statusState = "success";
			return ret;
		} else {
		    ret = $.API.lib.commonFunctions.createMiddleWareDetailsRecord(conn, JSONObJ);
// 			ret.statusState = "error";
// 			ret.statusText = "Record does not exists with api id : " + JSONObJ.API_ID + " in Middleware development details Table";
			return ret;
		}
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function updateRecord(conn, JSONObJ) {
	try {
		var ret = {};
		switch (JSONObJ.ENTITYSET) {
			case "/APIINFORMATION":
				ret = updateApiInformationRecord(conn, JSONObJ);
				break;
			case "/APIOVERVIEW":
				ret = updateApiOverviewRecord(conn, JSONObJ);
				break;
			case "/APIPROXYENDPOINT":
				ret = updateApiProxyEndPointRecord(conn, JSONObJ);
				break;
			case "/APITARGETENDPOINT":
				ret = updateApiTargetEndPointRecord(conn, JSONObJ);
				break;
			case "/APITESTSCENARIOS":
				ret = updateApiTestScenarioRecord(conn, JSONObJ);
				break;
			case "/SCPAPIDETAILS":
				ret = updateScpApiDetailsRecord(conn, JSONObJ);
				break;
			case "/BACKENDDETAILS":
				ret = updateBackEndDetailsRecord(conn, JSONObJ);
				break;
			case "/MIDDLEWAREDETAILS":
				ret = updateMiddleWareDetailsRecord(conn, JSONObJ);
				break;
			case "/HTTPMETHODLIST":
				break;
			case "/HOSTEDSYSTEMS":
				break;
			default:
				ret.statusState = "error";
				ret.statusText = "Invalid Entityset Name";
		}
		return ret;
	} catch (e) {
		ret.statusState = "error";
		ret.statusText = e.message;
		return ret;
	}
}

function checkIfTheBodyIsArrayOrObjectAndUpdateAccordingly() {
	var JSONString = $.request.body.asString(); //Reading the input JSON string
	var JSONObJ = JSON.parse(JSONString);
	var conn = $.db.getConnection();
	var res = {};
	if (Array.isArray(JSONObJ)) {
		for (var i = 0; i < JSONObJ.length; i++) {
			res = updateRecord(conn, JSONObJ[i]);
			if (res.statusState === "error") {
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
				$.response.setBody(res.statusText);
				return;
			}
		}
	} else {
		res = updateRecord(conn, JSONObJ);
		if (res.statusState === "error") {
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody(res.statusText);
			return;
		}
	}
	$.response.setBody("Successfully updated.");
	conn.commit();
	conn.close();
}
$.import("API.lib", "commonFunctions"); //
try {
	//Actual start of code execution
	switch ($.request.method) {
		case $.net.http.GET:
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody('HTTP Method GET is not supported');
			break;
		case $.net.http.POST:
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody('HTTP Method POST Is not supported');
			break;
		case $.net.http.PUT:
			checkIfTheBodyIsArrayOrObjectAndUpdateAccordingly();
			break;
		case $.net.http.DEL:
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody('HTTP Method DELETE is not supported');
			break;
		default:
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody('Invalid HTTP Method');
			break;
	}
} catch (e) {
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
}