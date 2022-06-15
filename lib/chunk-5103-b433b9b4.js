"use strict";(globalThis.webpackChunk_croquet_microverse=globalThis.webpackChunk_croquet_microverse||[]).push([[5103],{5103:(e,t,s)=>{s.r(t),s.d(t,{default:()=>a});const a={modules:[{name:"FlightTracker",actorBehaviors:[class FlightTrackerActor{setup(){this.listen("processFlight","processFlight"),this.listen("updateFlight","updateFlight"),this.planes=new Map}processFlight(e){let t=this.now();e.forEach(e=>this.planes.set(e[0],[t,e[1],e[2]]))}updateFlight(){let s=this.now(),a=[];this.planes.forEach((e,t)=>{12e4<s-e[0]&&a.push(t)}),a.forEach(e=>this.planes.delete(e)),this.say("displayFlight")}}],pawnBehaviors:[class FlightTrackerPawn{setup(){this.listen("displayFlight","displayFlight"),this.constructEarth(),this.chunkSize=100,this.listen("handleElected","handleElected"),this.listen("handleUnelected","handleUnelected"),this.say("electionStatusRequested")}constructEarth(){const e=Worldcore.THREE,t=(this.shape.children.forEach(e=>{e.material.dispose(),this.shape.remove(e)}),this.shape.children=[],(new e.TextureLoader).load("./assets/images/earthbase.png")),s=(t.wrapS=t.wrapT=e.RepeatWrapping,t.repeat.set(1,1),(new e.TextureLoader).load("./assets/images/earthshadow.jpg"));s.wrapS=s.wrapT=e.RepeatWrapping,s.repeat.set(1,1),this.shadowSphere=new e.Mesh(new e.SphereGeometry(3.95,64,64),new e.MeshStandardMaterial({map:s,color:11184810,roughness:.7,opacity:.9,transparent:!0})),this.shadowSphere.receiveShadow=!0,this.shape.add(this.shadowSphere),this.baseSphere=new e.Mesh(new e.SphereGeometry(4,64,64),new e.MeshStandardMaterial({alphaMap:t,color:2289186,roughness:.7,opacity:.9,transparent:!0})),this.baseSphere.receiveShadow=!0,this.baseSphere.castShadow=!0,this.shape.add(this.baseSphere);let a=new e.BufferGeometry;const h=[];h.push(0,0,0);var i=(new e.TextureLoader).load("./assets/images/ball.png");a.setAttribute("position",new e.Float32BufferAttribute(h,3));let r=new e.PointsMaterial({size:.075,sizeAttenuation:!0,map:i,alphaTest:.5,transparent:!0});r.color.set(16755251),this.planes=new e.Points(a,r),this.shape.add(this.planes),this.displayFlight()}processFlight(){var e,t=this.rawPlanes.length;let s=250;0===t?this.gettingFlight||this.getFlight():(e=Math.min(t,this.sendex+this.chunkSize),e=this.rawPlanes.slice(this.sendex,e),this.say("processFlight",e),this.sendex+=this.chunkSize,this.sendex>t&&(this.rawPlanes=[],this.say("updateFlight"),s=6e5)),this.future(s).processFlight()}displayFlight(){const e=Worldcore.THREE,s=[];let a=new e.Euler,h=new e.Vector3;this.actor.planes&&(this.actor.planes.forEach(e=>{var t=2*Math.PI*e[1]/360,e=2*Math.PI*e[2]/360;h.set(4.05,0,0),a.set(0,t,e),h.applyEuler(a),s.push(h.x,h.y,h.z)}),this.planes.geometry.setAttribute("position",new e.Float32BufferAttribute(s,3)))}handleElected(e){e&&e.to!==this.viewId||(console.log("flight tracker elected"),this.rawPlanes=[],this.nextTime=1e3,this.processFlight())}handleUnelected(){console.log("flight tracker unelected"),this.closeSocket()}closeSocket(){this.socket&&this.socket.close()}getFlight(){this.sendex=0,this.gettingFlight=!0,fetch("https://opensky-network.org/api/states/all").then(e=>{e.ok?e.json().then(e=>{e.states.forEach(e=>{e[6]&&e[5]&&this.rawPlanes.push([e[0],e[5],e[6],this.now()])}),this.gettingFlight=!1}):console.log("Network response was not ok.")}).catch(e=>console.log(e))}}]}]}}}]);