(function() {
    "use strict"
    var jwtService = require('./jwtService')

    var permissionService = {}

    permissionService.hasPermission = function(req, permission) {
        var permissionList = jwtService.verify(req)
        return permissionList !== null ? permissionList.contains(permission) : false
    }

    permissionService.containsAnyPermission = function(req, permissions) {
        var permissionList = jwtService.verify(req)
        if (permissionList !== null && typeof permissions !== 'undefined') {
            permissions.forEach(function(permission) {
                if (permissionList.contains(permission)) {
                    return true
                }
            })
        }

        return false
    }

    module.exports = permissionService
})()
