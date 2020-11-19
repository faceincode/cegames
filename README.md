CE Games Website

After exporting..

#1 @ IndexView.js
search:
<br/><FrameworkFormView.Controller-af-sock-framework-form />
<br/>replace:
<br/>{proxies['framework-form'] && <FrameworkFormView.Controller {...proxies['framework-form']}>{proxies['framework-form'].children}</FrameworkFormView.Controller>}

#2 @ webflow.js
search:
<br/>
!function(){o=t("html").attr("data-wf-site")
<br/>replace:
<br/>
!function(){return;o=t("html").attr("data-wf-site")
