//Placeholder for function definitions
function generateID() {
    var EntitySet = $.request.parameters.get('ENTITYSET');
    try {
        var entitySet;
        switch (EntitySet) {
            case "/APIOVERVIEW":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"API_OVERVIEW\"';
                break;
            case "/APIPROXYENDPOINT":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"API_PROXY_END_POINT\"';
                break;
            case "/APITARGETENDPOINT":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"API_TARGET_END_POINT\"';
                break;
            case "/APITESTSCENARIOS":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"API_TEST_SCENARIOS\"';
                break;
            case "/SCPAPIDETAILS":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"SCP_API_MANAGEMANT_DETAILS\"';
                break;
            case "/BACKENDDETAILS":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"BACKEND_DEVELOPMENT_DETAILS\"';
                break;
            case "/MIDDLEWAREDETAILS":
                entitySet = 'SELECT MAX(ID) FROM \"API\".\"MIDDLEWARE_DEVELOPMENT_DETAILS\"';
                break;
            case "/APIINFORMATION":
                entitySet = 'SELECT MAX(API_ID) FROM \"API\".\"API_INFO\"';
                break;
            default:
                throw new Error("Invalid Entityset Name");
        }
        var conn = $.db.getConnection();
        var query =  entitySet;
        var pstmt = conn.prepareStatement(query);
        var rs = pstmt.executeQuery();
        var result;
        while (rs.next()) {
            result = rs.getString(1);
        }
        result = parseInt(result, 10) + 1;
        $.response.setBody(result);
        $.response.status = $.net.http.OK;
        $.response.contentType = 'application/text';
        rs.close();
        pstmt.close();
        conn.close();
    } catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
    }
}
try {
    //Actual start of code execution
    switch ($.request.method) {
        case $.net.http.GET:
            generateID();
            break;
        case $.net.http.POST:
            $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
            $.response.setBody('HTTP Method POST Is not supported');
            break;
        case $.net.http.PUT:
            $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
            $.response.setBody('HTTP Method PUT is not supported');
            break;
        case $.net.http.DELETE:
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