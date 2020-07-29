module.exports = [
    {
        source: './dist',
        target: './dep'
    },
    {
        source: './dist/index.html',
        target: './dep/index.jsp',
        replace: [
            { pattern: '<x-insert name=repo>', replacement: '<!-- https://git.iflytek.com/SC_BDP_FE/fe-vue-origin.git -->' },
            { pattern: /\/\$\{ctx\}/g, replacement: '${ctx}/resources/bundle' },
            { pattern: '<x-insert name=encoding>', replacement: '<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>' },
            { pattern: '<x-insert name=taglibs>', replacement: '<%@ include file="/WEB-INF/view/inc/taglibs.jsp" %>' },
            { pattern: '<x-insert name=meta>', replacement: '<%@ include file="/WEB-INF/view/inc/meta.jsp" %>' }
        ]
    }
];
