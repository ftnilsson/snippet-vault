 //handle setupevents as quickly as possible 
 const setupEvents = require('../installers/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }

const {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  Tray,
  globalShortcut
} = require("electron");

const fs = require("fs");
const path = require("path");
const isDev = require("electron-is-dev");
const clipboardy = require("clipboardy");
const parser = require("fast-xml-parser");
const j2xParser = require("fast-xml-parser").j2xParser;
const he = require("he");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;
let snippets = {};

const registerShortcuts = () => {
  globalShortcut.register("CommandOrControl+Up", () => {
    if (isDev) {
      console.log("CommandOrControl+Up is pressed");
    }
    win.show();
  });
  globalShortcut.register("CommandOrControl+Down", () => {
    if (isDev) {
      console.log("CommandOrControl+Down is pressed");
    }

    win.hide();
  });

  registerSnippetShortcuts();
};

// const registerMenu = () => {
//   var menu = new Menu();
//   // const menuItem = new MenuItem({
//   // label: 'Shortcuts',
//   // });
//   // menu.append(menuItem)

//   return menu;
// };

const copyShortCutToClipboard = i => {
  if (isDev) {
    console.log("CommandOrControl " + i + " is pressed");
  }
  if (i > 0 && snippets.snippet && snippets.snippet[i - 1]) {
    const data = snippets.snippet[i - 1].data.__cdata;
    clipboardy.writeSync(data);
    win.webContents.send("copy-reply", data);
  }
};

const registerSnippetShortcuts = () => {
  globalShortcut.register("CommandOrControl+1", () => {
    copyShortCutToClipboard(1);
  });
  globalShortcut.register("CommandOrControl+2", () => {
    copyShortCutToClipboard(2);
  });
  globalShortcut.register("CommandOrControl+3", () => {
    copyShortCutToClipboard(3);
  });
  globalShortcut.register("CommandOrControl+4", () => {
    copyShortCutToClipboard(4);
  });
  globalShortcut.register("CommandOrControl+5", () => {
    copyShortCutToClipboard(5);
  });
  globalShortcut.register("CommandOrControl+6", () => {
    copyShortCutToClipboard(6);
  });
  globalShortcut.register("CommandOrControl+7", () => {
    copyShortCutToClipboard(7);
  });
  globalShortcut.register("CommandOrControl+8", () => {
    copyShortCutToClipboard(8);
  });
  globalShortcut.register("CommandOrControl+9", () => {
    copyShortCutToClipboard(9);
  });
};

function createWindow() {
  let loading = new BrowserWindow({
    show: false,
    frame: false,
    width: 300,
    height: 500,
    transparent: false
  });
  loading.webContents.openDevTools();
  loading.once("show", () => {
    registerShortcuts();
    // Create the main browser window.

    win = new BrowserWindow({
      show: false,
      width: 800,
      height: 600,
      transparent: true,
      frame: isDev ? true : false,
      icon: `${__dirname}/assets/64x64.png`
    });

    win.webContents.once("dom-ready", () => {
      setTimeout(() =>{
        win.show();
        loading.hide();
        loading.close();
      }, 5000);      
    });
   
    const tray = new Tray(`${__dirname}/assets/16x16.png`);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open",
        click() {
          win.show();
        }
      },
      {
        label: "Close",
        click() {
          win.hide();
        }
      },
      {
        label: "Exit",
        role: "quit",
        click() {
          app.quit();
        }
      }
    ]);
    console.log(path.join(__dirname, "../build/index.html"));
    tray.setToolTip(app.getName());
    tray.setTitle(app.getName());
    tray.setContextMenu(contextMenu);
    win.loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    if (isDev) {
      // Open the DevTools.
      win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on("closed", () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
  });

  loading.loadURL(
    isDev
      ? `file://${path.join(__dirname, "loading.html")}`
      : `file://${path.join(__dirname, "../build/loading.html")}`
  );
  loading.show();
}

ipcMain.on("minimize-app", event => {
  win.hide();
})

ipcMain.on("maximize-app", event => {
  win.show();
})

ipcMain.on("close-app", event => {
  app.quit();
})

ipcMain.on("load-snippets", event => {
  try {
    fs.readFile(
      path.join(__dirname, "/snippets/snippets.txt"),
      "utf8",
      function read(err, data) {
        if (err) {
          throw err;
        }
        var content = data;

        snippets = parseSnippetsToJson(content);

        event.sender.send("load-reply", snippets);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

ipcMain.on("save-snippets", (event, arg) => {
  if (isDev) {
    console.log("snippets", arg);
  }
  try {
    const xml = parseSnippetsToXml(arg);
    snippets = arg;

    fs.copyFileSync(
      path.join(__dirname, "snippets/snippets.txt"),
      path.join(__dirname, "snippets/snippets.text.bak"),
      err => {
        if (err) throw err;
        console.log("snippets.txt was copied to snippets.txt.bak");
      }
    );

    fs.writeFileSync(
      path.join(__dirname, "snippets/snippets.txt"),
      xml,
      "utf-8"
    );
    event.sender.send("save-reply", arg);
  } catch (e) {
    console.log(e);
  }
});

const parseSnippetsToJson = content => {
  var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: a => he.decode(a) //default is a=>a
  };

  if (parser.validate(content) === true) {
    var tObj = parser.getTraversalObj(content, options);
    var jsonObj = parser.convertToJson(tObj, options);

    return jsonObj;
  }
  return {};
};

const parseSnippetsToXml = content => {
  var namedContent = content.map(c => {
    return {
      snippet: { id: c.id, name: c.name, isFav: c.isFav, data: c.data }
    };
  });

  var defaultOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: "@", //default is false
    textNodeName: "#text",
    ignoreAttributes: true,
    cdataTagName: "__cdata", //default is false
    cdataPositionChar: "\\c",
    format: true,
    indentBy: "  ",
    supressEmptyNode: false,
    tagValueProcessor: a => he.encode(a, { useNamedReferences: true }), // default is a=>a
    attrValueProcessor: a => he.encode(a) // default is a=>a
  };

  var parser = new j2xParser(defaultOptions);
  var xml = parser.parse(namedContent);
  var regex = /(<[0-9]*>)|(<\/[0-9]*>)/g;
  return xml.replace(regex, "");
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

app.on("minimize", function(event) {
  event.preventDefault();
  win.hide();
});
