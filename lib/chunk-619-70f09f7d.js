"use strict";(globalThis.webpackChunk_croquet_microverse=globalThis.webpackChunk_croquet_microverse||[]).push([[619],{619:(e,t,i)=>{i.r(t),i.d(t,{default:()=>s});const s={modules:[{name:"Elected",actorBehaviors:[class ElectedActor{setup(){this.views||(this.views=new Set),this.scriptSubscribe(this.sessionId,"view-join","viewJoined"),this.scriptSubscribe(this.sessionId,"view-exit","viewExited")}electedView(){for(const e of this.views)return e}viewJoined(e){this.publishViewElectedAfter(()=>this.views.add(e))}viewExited(e){this.publishViewElectedAfter(()=>this.views.delete(e))}publishViewElectedAfter(e){var t=this.electedView(),e=(e(),this.electedView());t!==e&&this.say("view-elected",e)}}],pawnBehaviors:[class ElectedPawn{setup(){this.electedViewId="",this.scriptListen({event:"view-elected",handling:"oncePerFrame"},this.onViewElected),this.onViewElected(this.actorCall("ElectedActor","electedView")),this.scriptListen("handleElected",this.handleElected),this.scriptListen("handleUnelected",this.handleUnelected),this.scriptListen("electionStatusRequested",this.electionStatusRequested)}isElected(){return this.viewId===this.electedViewId}electionStatusRequested(){console.log("requested"),this.onViewElected(this.actorCall("ElectedActor","electedView"))}onViewElected(e){var t=this.isElected();this.electedViewId=e,console.log("onViewElected",t,e,this.viewId),t!==this.isElected()?t?this.say("handleUnelected",{from:this.electedViewId,to:e}):(console.log("say handleElected",this.actor.id),this.say("handleElected",{from:this.electedViewId,to:e})):console.log("%cView Elected: %s (this view %s %s)","color: #CC0",this.electedViewId||"<none>",this.viewId,t?"still elected ✅":"unaffected ❌")}handleElected(){console.log("%cView Elected: %s (this view %s elected ✅)","color: #0C0",this.electedViewId||"<none>",this.viewId)}handleUnelected(){console.log("%cView Elected: %s (this view %s unelected ❌)","color: #C00",this.electedViewId||"<none>",this.viewId)}destroy(){this.onViewElected("")}}]}]}}}]);