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

function prepareStatementSetString(conn, JSONObJ) {
    var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"API_INFO\" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
    st.setString(1, validateVariable(JSONObJ.API_ID));
    st.setString(2, validateVariable(JSONObJ.TITLE));
    st.setString(3, validateVariable(JSONObJ.DESCRIPTION));
    st.setString(4, validateVariable(JSONObJ.HOSTED_SYSTEM));
    if (validateVariable(JSONObJ.PUBLISHED_ON) === "") {
        st.setNull(5, null);
    } else {
        st.setTimestamp(5, new Date(JSONObJ.PUBLISHED_ON));
    }
    if (validateVariable(JSONObJ.RELEASE_DATE) === "") {
        st.setNull(6, null);
    } else {
        st.setTimestamp(6, new Date(JSONObJ.RELEASE_DATE));
    }
    st.setString(7, validateVariable(JSONObJ.API_VERSION));
    st.setString(8, validateVariable(JSONObJ.API_VENDOR));
    st.setString(9, validateVariable(JSONObJ.API_MODE));
    st.setString(10, validateVariable(JSONObJ.PROCESS_AREA));
    st.setString(11, validateVariable(JSONObJ.GET_REQUEST_ENABLED));
    st.setString(12, validateVariable(JSONObJ.PUT_REQUEST_ENABLED));
    st.setString(13, validateVariable(JSONObJ.POST_REQUEST_ENABLED));
    st.setString(14, validateVariable(JSONObJ.DELETE_REQUEST_ENABLED));
    st.setString(15, validateVariable(JSONObJ.CUSTOMFIELD_1));
    st.setString(16, validateVariable(JSONObJ.CUSTOMFIELD_2));
    st.setString(17, validateVariable(JSONObJ.CUSTOMFIELD_3));
    st.setString(18, validateVariable(JSONObJ.CUSTOMFIELD_4));
    st.setString(19, validateVariable(JSONObJ.CUSTOMFIELD_5));
    st.setString(20, validateVariable(JSONObJ.RELEASE_STATUS));
    return st;
}

function createApiInformationRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 0) {
            var st = prepareStatementSetString(conn, JSONObJ);
            st.execute();
            ret.statusState = "success";
            return ret;
        } else {
            ret.statusState = "error";
            ret.statusText = "API with ID " + JSONObJ.API_ID + " Already exists";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createApiOverviewRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_OVERVIEW"', JSONObJ.API_ID);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"API_OVERVIEW\" values(?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.TITLE));
                st.setString(3, validateVariable(JSONObJ.DESCRIPTION));
                st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id : " + JSONObJ.API_ID + " in Api Overview Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createApiProxyEndPointRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_PROXY_END_POINT"', JSONObJ.API_ID);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"API_PROXY_END_POINT\" values(?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.NAME));
                st.setString(3, validateVariable(JSONObJ.VALUE));
                st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id : " + JSONObJ.API_ID + " in Api proxy end point Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createApiTargetEndPointRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_TARGET_END_POINT"', JSONObJ.API_ID);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"API_TARGET_END_POINT\" values(?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.TITLE));
                st.setString(3, validateVariable(JSONObJ.URL));
                st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id : " + JSONObJ.API_ID + " in Api target end point Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createApiTestScenarioRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsScenario(conn, '"API_MANAGEMENT"."API_TEST_SCENARIOS"', JSONObJ.API_ID, JSONObJ.SCENARIO_NAME);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"API_TEST_SCENARIOS\" values(?,?,?,?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.SCENARIO_NAME));
                st.setString(3, validateVariable(JSONObJ.API_URL));
                st.setString(4, validateVariable(JSONObJ.API_REQUEST_BODY));
                st.setString(5, validateVariable(JSONObJ.API_RESPONSE_CONTENT));
                st.setString(6, validateVariable(JSONObJ.API_HTTP_METHOD));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(9, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(10, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(11, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id " + JSONObJ.API_ID + " and Test scenario name " + JSONObJ.SCENARIO_NAME + " in test scenario Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createScpApiDetailsRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."SCP_API_MANAGEMANT_DETAILS"', JSONObJ.API_ID);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"SCP_API_MANAGEMANT_DETAILS\" values(?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.SCP_TENANT));
                st.setString(3, validateVariable(JSONObJ.URL));
                st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id : " + JSONObJ.API_ID + " in SCP Api Management Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createBackEndDetailsRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."BACKEND_DEVELOPMENT_DETAILS"', JSONObJ.API_ID);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"BACKEND_DEVELOPMENT_DETAILS\" values(?,?,?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.FM_NAME));
                st.setString(3, validateVariable(JSONObJ.FUNCTION_GROUP));
                st.setString(4, validateVariable(JSONObJ.ABAP_CLASS_NAME));
                st.setString(5, validateVariable(JSONObJ.TRANSPORT));
                st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(9, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(10, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id : " + JSONObJ.API_ID + " in Backend development details Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createMiddleWareDetailsRecord(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."API_INFO"', JSONObJ.API_ID);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 1) {
            recordExistsResult = checkIfRecordAlreadyExistsNonScenario(conn, '"API_MANAGEMENT"."MIDDLEWARE_DEVELOPMENT_DETAILS"', JSONObJ.API_ID);
            if (recordExistsResult.statusState === "error") {
                return recordExistsResult;
            }
            if (recordExistsResult.result === 0) {
                var st = conn.prepareStatement('INSERT INTO \"API_MANAGEMENT\".\"MIDDLEWARE_DEVELOPMENT_DETAILS\" values(?,?,?,?,?,?,?,?)');
                st.setString(1, validateVariable(JSONObJ.API_ID));
                st.setString(2, validateVariable(JSONObJ.IFLOW_NAME));
                st.setString(3, validateVariable(JSONObJ.POST));
                st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_1));
                st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_2));
                st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_3));
                st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_4));
                st.setString(8, validateVariable(JSONObJ.CUSTOMFIELD_5));
                st.execute();
                ret.statusState = "success";
                return ret;
            } else {
                ret.statusState = "error";
                ret.statusText = "Record already exists with api id : " + JSONObJ.API_ID + " in Middleware development details Table";
                return ret;
            }
        } else {
            ret.statusState = "error";
            ret.statusText = "API Does not exists with api id : " + JSONObJ.API_ID + " in Api Information Table";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createHttpMethodist(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkRecordIfExists(conn, '"API_MANAGEMENT"."HTTP_METHOD_LIST"', 'HTTP_METHOD_NAME', JSONObJ.HTTP_METHOD_NAME);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 0) {
            var st = conn.prepareStatement('INSERT INTO "API_MANAGEMENT"."HTTP_METHOD_LIST" VALUES (?,?,?,?,?,?)');
            st.setString(1, validateVariable(JSONObJ.HTTP_METHOD_NAME));
            st.setString(2, validateVariable(JSONObJ.CUSTOMFIELD_1));
            st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_2));
            st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_3));
            st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_4));
            st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_5));
            st.execute();
            ret.statusState = "success";
            return ret;
        } else {
            ret.statusState = "error";
            ret.statusText = "A record with HTTP Method " + JSONObJ.HTTP_METHOD_NAME + " Already exists";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createHostedSystemsList(conn, JSONObJ) {
    try {
        var ret = {};
        var recordExistsResult = checkRecordIfExists(conn, '"API_MANAGEMENT"."HTTP_METHOD_LIST"', 'HOSTED_SYSTEM_NAME', JSONObJ.HOSTED_SYSTEM_NAME);
        if (recordExistsResult.statusState === "error") {
            return recordExistsResult;
        }
        if (recordExistsResult.result === 0) {
            var st = conn.prepareStatement('INSERT INTO "API_MANAGEMENT"."API_HOSTED_SYSTEM_LIST" VALUES (?,?,?,?,?,?,?)');
            st.setString(1, validateVariable(JSONObJ.HOSTED_SYSTEM_NAME));
            st.setString(2, validateVariable(JSONObJ.HOSTED_SYSTEM_DESCRIPTION));
            st.setString(3, validateVariable(JSONObJ.CUSTOMFIELD_1));
            st.setString(4, validateVariable(JSONObJ.CUSTOMFIELD_2));
            st.setString(5, validateVariable(JSONObJ.CUSTOMFIELD_3));
            st.setString(6, validateVariable(JSONObJ.CUSTOMFIELD_4));
            st.setString(7, validateVariable(JSONObJ.CUSTOMFIELD_5));
            st.execute();
            ret.statusState = "success";
            return ret;
        } else {
            ret.statusState = "error";
            ret.statusText = "A record with Hosted System ID " + JSONObJ.HOSTED_SYSTEM_NAME + " Already exists";
            return ret;
        }
    } catch (e) {
        ret.statusState = "error";
        ret.statusText = e.message;
        return ret;
    }
}

function createRecord(conn, JSONObJ) {
    try {
        var ret = {};
        switch (JSONObJ.ENTITYSET) {
            case "/APIINFORMATION":
                ret = createApiInformationRecord(conn, JSONObJ);
                break;
            case "/APIOVERVIEW":
                ret = createApiOverviewRecord(conn, JSONObJ);
                break;
            case "/APIPROXYENDPOINT":
                ret = createApiProxyEndPointRecord(conn, JSONObJ);
                break;
            case "/APITARGETENDPOINT":
                ret = createApiTargetEndPointRecord(conn, JSONObJ);
                break;
            case "/APITESTSCENARIOS":
                ret = createApiTestScenarioRecord(conn, JSONObJ);
                break;
            case "/SCPAPIDETAILS":
                ret = createScpApiDetailsRecord(conn, JSONObJ);
                break;
            case "/BACKENDDETAILS":
                ret = createBackEndDetailsRecord(conn, JSONObJ);
                break;
            case "/MIDDLEWAREDETAILS":
                ret = createMiddleWareDetailsRecord(conn, JSONObJ);
                break;
            case "/HTTPMETHODLIST":
                ret = createHttpMethodist(conn, JSONObJ);
                break;
            case "/HOSTEDSYSTEMS":
                ret = createHostedSystemsList(conn, JSONObJ);
                break;
            default:
                ret.statusState = "error";
                ret.statusText = "Invalid Entityset Name";
        }
        return ret;
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e);
    }
}

function checkIfTheBodyIsArrayOrObjectAndInsertAccordingly() {
    var JSONString = $.request.body.asString(); //Reading the input JSON string
    var JSONObJ = JSON.parse(JSONString);
    var conn = $.db.getConnection();
    var res = {};
    if (Array.isArray(JSONObJ)) {
        for (var i = 0; i < JSONObJ.length; i++) {
            res = createRecord(conn, JSONObJ[i]);
            if (res.statusState === "error") {
                $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
                $.response.setBody(res.statusText);
                return;
            }
        }
    } else {
        res = createRecord(conn, JSONObJ);
        if (res.statusState === "error") {
            $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
            $.response.setBody(res.statusText);
            return;
        }
    }
    $.response.setBody("Successfully created.");
    conn.commit();
    conn.close();
}
try {
    //Actual start of code execution
    switch ($.request.method) {
        case $.net.http.GET:
            $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
            $.response.setBody('HTTP Method GET Is not supported');
            break;
        case $.net.http.POST:
            checkIfTheBodyIsArrayOrObjectAndInsertAccordingly();
            break;
        case $.net.http.PUT:
            $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
            $.response.setBody('HTTP Method PUT is not supported');
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
    $.response.setBody(e);
}