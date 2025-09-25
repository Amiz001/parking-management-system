[plugin:vite:import-analysis] Failed to resolve import "../../components/PopupForm" from "src/pages/customerSupport/CustomerDasboard.jsx". Does the file exist?
C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/src/pages/customerSupport/CustomerDasboard.jsx:2:22
17 |  var _s = $RefreshSig$();
18 |  import React, { useState, useEffect } from "react";
19 |  import PopupForm from "../../components/PopupForm";
   |                         ^
20 |  import { useClickOutside } from "../../hooks/useClickOutside";
21 |  import Axios from "axios";
    at TransformPluginContext._formatLog (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:31470:43)
    at TransformPluginContext.error (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:31467:14)
    at normalizeUrl (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:30010:18)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:30068:32
    at async Promise.all (index 4)
    at async TransformPluginContext.transform (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:30036:4)
    at async EnvironmentPluginContainer.transform (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:31284:14)
    at async loadAndTransform (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:26454:26)
    at async viteTransformMiddleware (file:///C:/Users/VICTUS/Documents/GitHub/parking-management-system/client/node_modules/vite/dist/node/chunks/dep-Bg4HVnP5.js:27539:20)
Click outside, press Esc key, or fix the code to dismiss.
You can also disable this overlay by setting server.hmr.overlay to false in vite.config.js.