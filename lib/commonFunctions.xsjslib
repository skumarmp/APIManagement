function validateVariable(variable) {
    if (variable === undefined || variable === null) {
        return "";
    } else {
        return variable;
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