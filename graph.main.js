 (function(S) {
     const $ = document.getElementById.bind(document)
     const {
         h,
         StartServices,
         ServiceFont,
         getUrlPara,
         SideToolbox,
         Loading,
         createVars,
         Modal,
         local,
         myome,
         // fabric,
         icons,
         downloadSvgStr,
         downloadObjectAsJson,
         initLayer,
         ServiceZiDian,
         // AlignGuidelines,
         pluginConfig,
         pluginZi,
         pluginSelectedConfig,
         // pluginTestV,
         pluginShapes,
         //pluginDrawIO,
         pluginTest
     } = S


     var container = $("container")

     var content = h("div", {
         id: "content",
         style: "display:none"
     })

     var loading = new Loading({
         words: "Start Services"
     })
     var modal = new Modal()
     container.appendChild(modal)
     container.appendChild(loading)

     // TODO Parameters ...
     //
     var header = h("div", {
         style: "position:relative;margin:auto;height:45px;display:none"
     }, [])
     container.appendChild(header)
     container.appendChild(content)

     var core = () => {}
     core.modal = modal
     var sideToolbox = new SideToolbox();
     container.appendChild(sideToolbox);


     sideToolbox.style.display = "none"
     // TODO  ....
     //

     StartServices(core, {}, [
         "data",
         "file-manager",
         ["zidian",ServiceZiDian,0]
     ]).then((d) => {
         fetch("./test.json").then((d0) => (d0.json())).then((d1) => {
             loading.remove()
             header.style.display = null
             content.style.display = null
             var input = h("input", {
                 maxlength: 1,
                 //style: "width:100px;margin:auto",
                 placeholder:"请输入一个字",
                 id:"zi",
             })
             content.appendChild(h("div", {class:"input", style:"text-align:center;margin:auto;padding-top:20px"},
                 [input,h("label",{for:"zi"},"请输入一个字")]))
             input.on("change", (e) => {
                 core.vars.zi = input.value
             })

             var vars = createVars("zi") // TODO As Parameters 
             core.vars = vars
             core.vars.zi = "字"
             input.value = core.vars.zi
             core.canvasObjectRender = () => {} // add ...
             core.objectRender = () => {} // add ...

             const u = initLayer(core, container, content, header, sideToolbox, d1.size, true)
             // right sidebar toolbox ...
             pluginConfig(core)(sideToolbox)
             pluginSelectedConfig(core)(sideToolbox)
             //div plugin
             //canvas plugin TODO show/hide according to editLayer ...
             pluginShapes(core)(sideToolbox)
             // pluginDrawIO(core)(sideToolbox)
             pluginTest(core)(sideToolbox)
             // Just Hide Them Still Load ...
             // Separate it ??? 

             u()
             d1.layers.forEach((l) => {
                 core.addLayer(l)
             })
         }).catch((e) => {
             console.warn(e)
         })
     })
 })(sand)
