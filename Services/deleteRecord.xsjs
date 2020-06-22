function deleteFromApiTable(tableName, fieldName, key) {
    try {
        var conn = $.db.getConnection();
        var st = conn.prepareStatement('DELETE FROM ' + tableName + ' WHERE ' + fieldName + ' = ?');
        st.setString(1, key);
        st.execute();
        conn.commit();
        conn.close();
        $.response.setBody("Successfully deleted a record");
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
    }
}

function deleteFromApiTableTestScenario(JSONObJ) {
    try {
        var conn = $.db.getConnection();
        var st = conn.prepareStatement('DELETE FROM \"API_MANAGEMENT\".\"API_TEST_SCENARIOS\" WHERE API_ID = ? and SCENARIO_NAME = ?');
        st.setString(1, JSONObJ.API_ID);
        st.setString(2, JSONObJ.SCENARIO_NAME);
        st.execute();
        conn.commit();
        conn.close();
        $.response.setBody("Successfully deleted a record");
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
    }
}

function deleteRecord() {
    try {
        var JSONString = $.request.body.asString(); //Reading the input JSON string
        var JSONObJ = JSON.parse(JSONString);
        switch (JSONObJ.ENTITYSET) {
            case "/APIINFORMATION":
                deleteFromApiTable('"API_MANAGEMENT"."API_INFO"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."API_OVERVIEW"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."API_PROXY_END_POINT"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."API_TARGET_END_POINT"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."SCP_API_MANAGEMANT_DETAILS"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."BACKEND_DEVELOPMENT_DETAILS"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."MIDDLEWARE_DEVELOPMENT_DETAILS"', 'API_ID', JSONObJ.API_ID);
                deleteFromApiTable('"API_MANAGEMENT"."API_TEST_SCENARIOS"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/APIOVERVIEW":
                deleteFromApiTable('"API_MANAGEMENT"."API_OVERVIEW"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/APIPROXYENDPOINT":
                deleteFromApiTable('"API_MANAGEMENT"."API_PROXY_END_POINT"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/APITARGETENDPOINT":
                deleteFromApiTable('"API_MANAGEMENT"."API_TARGET_END_POINT"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/APITESTSCENARIOS":
                deleteFromApiTableTestScenario(JSONObJ);
                break;
            case "/SCPAPIDETAILS":
                deleteFromApiTable('"API_MANAGEMENT"."SCP_API_MANAGEMANT_DETAILS"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/BACKENDDETAILS":
                deleteFromApiTable('"API_MANAGEMENT"."BACKEND_DEVELOPMENT_DETAILS"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/MIDDLEWAREDETAILS":
                deleteFromApiTable('"API_MANAGEMENT"."MIDDLEWARE_DEVELOPMENT_DETAILS"', 'API_ID', JSONObJ.API_ID);
                break;
            case "/HTTPMETHODLIST":
                deleteFromApiTable('"API_MANAGEMENT"."HTTP_METHOD_LIST"', 'HTTP_METHOD_NAME', JSONObJ.HTTP_METHOD_NAME);
                break;
            case "/HOSTEDSYSTEMS":
                deleteFromApiTable('"API_MANAGEMENT"."API_HOSTED_SYSTEM_LIST"', 'HOSTED_SYSTEM_NAME', JSONObJ.HOSTED_SYSTEM_NAME);
                break;
            default:
                throw new Error("Invalid Entityset Name");
        }
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e);
    }
}
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
            $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
            $.response.setBody('HTTP Method PUT is not supported');
            break;
        case $.net.http.DEL:
            deleteRecord();
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