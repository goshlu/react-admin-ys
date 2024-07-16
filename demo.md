// // import {FixedSizeList as List} from "react-window";

// // const Row = ({index, style}) => {
// //     <div style={style}>Row {index}</div>
// // }

// // const Example = () => {
// //     <List
// //         height={150}
// //         itemCount={1000}
// //         itemSize={35}
// //         width={300}
// //     >
// //     {Row}
// //     </List>
// // }

// // const OtherComponent = () => React.lazy(() => import("./otherComponent"));

// // function MyComponent() {
// //     return (
// //         <Suspense fallback={<div>Loading...</div>}>
// //             <OtherComponent />
// //         </Suspense>
// //     )
// // }

// import React, { useState, useRef, useEffect} from "react";

// const CanvasTable = ({data}) => {
//  const canvasRef = useRef(null);

//  useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rowHeight = 20;
//     const columnWidths = [50,100,150];

//     canvas.height = data.length * rowHeight;
//     canvas.width = columnWidths.reduce((a,b) => a + b, 0);

//     data.forEach((row,rowIndex) => {
//         const y = rowIndex * rowHeight;
//         ctx.fillText(row.id,0,y+rowHeight/2);
//         ctx.fillText(row.name,columnWidths[0],y+rowHeight/2);
//         ctx.fillText(row.age,columnWidths[0]+columnWidths[1],y+rowHeight/2);
//         ctx.strokeRect(0,y,canvas.width,rowHeight);
//     });
//  }, [data])

//  return <canvas ref={canvasRef} />
// }

function add() {
    var args = Array.prototype.slice.call(arguments);

    var fn = function() {
        var sub_arg = Array.prototype.slice.call(arguments);

        return add.apply(null, args.concat(sub_arg));
    }


    fn.valueOf = function() {
        return args.reduce(function(a,b){
            return a+b;
        })
    } 

    return fn;
}

console.log(add(1,2));

function add1(){
    var args = Array.prototype.slice.call(arguments);

    var fn = function() {
        args.push(...arguments);
        return fn;
    }

    fn.valueOf = function() {
        return args.reduce(function(a,b){
            return a + b;
        })
    }

    return fn;
}

console.log(add1(1,2))


const {app,BrowserWindow} = require('electron');
const net = require('net');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL('http://localhost:3000');
}

function waitForReact() {
    const client = new net.Socket();
    client.connect({port: 3000}, () => {
        client.end();
        createWindow();
    })

    client.on('error', () => {
        setTimeout(waitForReact, 1000);
    })
}

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        waitForReact();
    }
})