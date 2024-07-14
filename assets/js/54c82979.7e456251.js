"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[254],{9761:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>r,toc:()=>h});var o=n(4848),s=n(8453);const i={position:1},a="Getting Started",r={id:"getting-started/index",title:"Getting Started",description:"What is Agentok Studio",source:"@site/docs/getting-started/index.md",sourceDirName:"getting-started",slug:"/getting-started/",permalink:"/docs/getting-started/",draft:!1,unlisted:!1,editUrl:"https://github.com/hughlv/agentok/edit/main/website/docs/getting-started/index.md",tags:[],version:"current",lastUpdatedAt:1720168461,formattedLastUpdatedAt:"Jul 5, 2024",frontMatter:{position:1},sidebar:"guideSidebar",next:{title:"Concepts",permalink:"/docs/concepts"}},l={},h=[{value:"What is Agentok Studio",id:"what-is-agentok-studio",level:2},{value:"Key Concepts",id:"key-concepts",level:2},{value:"Agent",id:"agent",level:3},{value:"Workflow",id:"workflow",level:3},{value:"Chat",id:"chat",level:3},{value:"Workflow Template",id:"workflow-template",level:3},{value:"&quot;Hello World&quot;",id:"hello-world",level:2},{value:"Initialize a New Workflow",id:"initialize-a-new-workflow",level:3},{value:"Build Your First Workflow",id:"build-your-first-workflow",level:3},{value:"Start Chat",id:"start-chat",level:3},{value:"Check Python Code",id:"check-python-code",level:3},{value:"Publish as Template",id:"publish-as-template",level:3},{value:"Next Steps",id:"next-steps",level:2},{value:"More Readings",id:"more-readings",level:2}];function d(e){const t={a:"a",admonition:"admonition",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"getting-started",children:"Getting Started"}),"\n",(0,o.jsx)(t.h2,{id:"what-is-agentok-studio",children:"What is Agentok Studio"}),"\n",(0,o.jsxs)(t.p,{children:["Agentok Studio is a tool built for ",(0,o.jsx)(t.a,{href:"https://microsoft.github.io/autogen/",children:"AutoGen"}),", a fantastic agent framework from Microsoft Research."]}),"\n",(0,o.jsx)(t.p,{children:"AutoGen streamlines the process of creating multi-agent applications with its clear and user-friendly approach. Agentok Studio takes this accessibility a step further by offering visual tools that simplify the building and management of agent workflows."}),"\n",(0,o.jsx)(t.h2,{id:"key-concepts",children:"Key Concepts"}),"\n",(0,o.jsx)(t.h3,{id:"agent",children:"Agent"}),"\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.strong,{children:"Agent"})," is the core concept in AutoGen and Agentok Studio. For applications, this usually means a ",(0,o.jsx)(t.strong,{children:"ConversableAgent"}),", which includes two types: ",(0,o.jsx)(t.strong,{children:"AssistantAgent"})," and ",(0,o.jsx)(t.strong,{children:"UserProxyAgent"}),"."]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"Assistant Agent"})}),"\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.strong,{children:"AssistantAgent"})," is your go-to helper to accomplish a task\u2014it could be a chatbot, a code generator, or a planner\u2014perhaps even a blend of them."]}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"UserProxy Agent"})}),"\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.strong,{children:"UserProxyAgent"})," enables interaction with the ",(0,o.jsx)(t.strong,{children:"AssistantAgent"}),". It can take the form of a chatbot, a code executor, or even a human\u2014it's quite the versatile agent."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(t.h3,{id:"workflow",children:"Workflow"}),"\n",(0,o.jsxs)(t.p,{children:["A ",(0,o.jsx)(t.strong,{children:"Workflow"})," consists of a network of ",(0,o.jsx)(t.strong,{children:"Agents"}),". It's the foundation of any multi-agent application."]}),"\n",(0,o.jsxs)(t.p,{children:["A standard Workflow usually includes one ",(0,o.jsx)(t.strong,{children:"UserProxyAgent"})," and one or several ",(0,o.jsx)(t.strong,{children:"AssistantAgents"}),". The ",(0,o.jsx)(t.strong,{children:"UserProxyAgent"})," is your direct line of interaction, while the ",(0,o.jsx)(t.strong,{children:"AssistantAgents"})," work behind the scenes, collaborating to build a robust multi-agent application."]}),"\n",(0,o.jsx)(t.h3,{id:"chat",children:"Chat"}),"\n",(0,o.jsx)(t.p,{children:"Each Chat represents a live session that has been spun up from a Workflow or a AutoflowTemplate."}),"\n",(0,o.jsx)(t.h3,{id:"workflow-template",children:"Workflow Template"}),"\n",(0,o.jsxs)(t.p,{children:["Ready to launch a Workflow? Publish it as a ",(0,o.jsx)(t.strong,{children:"AutoflowTemplate"})," in the ",(0,o.jsx)(t.a,{href:"https://studio.agentok.ai/templates/",children:"Agentok Studio Template"}),"! Users can then deploy these templates to conjure up new Workflows or strike up chats directly on the template itself."]}),"\n",(0,o.jsx)(t.h2,{id:"hello-world",children:'"Hello World"'}),"\n",(0,o.jsx)(t.p,{children:'Let\'s jump straight in and create a simple "Hello World" flow.'}),"\n",(0,o.jsx)(t.h3,{id:"initialize-a-new-workflow",children:"Initialize a New Workflow"}),"\n",(0,o.jsxs)(t.p,{children:["Head over to ",(0,o.jsx)(t.a,{href:"https://studio.agentok.ai/auth/login",children:"Agentok Studio Login"})," and tap ",(0,o.jsx)(t.strong,{children:"Login as Guest"})," for a test run without the need to sign up."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"Login",src:n(3717).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsx)(t.p,{children:"It's always a good practice to login with your own social ID and create your own Workflow to play with."}),"\n",(0,o.jsx)(t.admonition,{type:"warning",children:(0,o.jsx)(t.p,{children:"Guest mode means your data is an open book to other guests. Sign in with your GitHub/Google/X account for a private experience."})}),"\n",(0,o.jsxs)(t.p,{children:["Once you're in, go to the ",(0,o.jsx)(t.a,{href:"https://studio.agentok.ai",children:"homepage"})," and hit the ",(0,o.jsx)(t.strong,{children:"Build from Scratch"})," button to weave a new Workflow."]}),"\n",(0,o.jsx)(t.h3,{id:"build-your-first-workflow",children:"Build Your First Workflow"}),"\n",(0,o.jsx)(t.p,{children:"Get started by tidying up the canvas\u2014scrap any sample nodes that are hanging about. Now, let's get crafting:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["Tap the plus sign \u2a01 in the top left and ferry over an ",(0,o.jsx)(t.strong,{children:"Assistant Agent"}),"."]}),"\n",(0,o.jsxs)(t.li,{children:["Next, snag a ",(0,o.jsx)(t.strong,{children:"UserProxy Agent"})," and drop it in place."]}),"\n",(0,o.jsx)(t.li,{children:"Connect these two, and voil\xe0\u2014you've got flow! \ud83d\udd17"}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"node",src:n(8812).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsx)(t.p,{children:"Here\u2019s a visual to guide you through:"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"flow",src:n(3284).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsx)(t.p,{children:"Some key points to note:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["Set ",(0,o.jsx)(t.strong,{children:"Human Input Mode"})," to ",(0,o.jsx)(t.strong,{children:"ALWAYS"}),", so human (you) can always provide feedback."]}),"\n",(0,o.jsxs)(t.li,{children:["Set ",(0,o.jsx)(t.strong,{children:"Max Consecutive Auto-Replies"})," to ",(0,o.jsx)(t.strong,{children:"1"}),", so that if AsssitantAgent provide some code to execute, you can simply press Enter and UserProxyAgent will help to execute the code and send back the result to AssitantAgent. This is exactly what means by ",(0,o.jsx)(t.strong,{children:"Multi-Agent Collaboration"}),"."]}),"\n",(0,o.jsxs)(t.li,{children:["A few ",(0,o.jsx)(t.strong,{children:"Sample Messages"})," are provided in Config node. This is a convenient feature for your target users to get started with your Workflow."]}),"\n"]}),"\n",(0,o.jsx)(t.h3,{id:"start-chat",children:"Start Chat"}),"\n",(0,o.jsxs)(t.p,{children:["Fire up your flow by smashing the ",(0,o.jsx)(t.strong,{children:"Start Chat"})," button at the top right. Click one sample message above the Send button and watch the magic unfold in your chat window:"]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"Chat",src:n(266).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsxs)(t.p,{children:["We know it's kinda difficult to write the first messages other than 'hi' or 'hello' in a chatbot. As you can see the samples above Send button, So we also provide a ",(0,o.jsx)(t.strong,{children:"Sample Message"})," feature to help you and your users get started. You can pick one to click and send."]}),"\n",(0,o.jsx)(t.admonition,{type:"tip",children:(0,o.jsx)(t.p,{children:"Though the user experience looks like a chat app, we need to clarify that multi-agent app is generally for you to solve complicated problems, so it will not get responded as fast as a chat app. You may need to wait for a few seconds or even minutes to get the final answer."})}),"\n",(0,o.jsx)(t.h3,{id:"check-python-code",children:"Check Python Code"}),"\n",(0,o.jsx)(t.p,{children:"For developers who need to dive into more details about what is happening underhood, you can click the Python icon and check the generated Python code:"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"Python",src:n(9542).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsx)(t.p,{children:"In most cases, the generated code has few dependencies other than AutoGen. You can copy and download the code to your local machine and run as norml console program with Python."}),"\n",(0,o.jsx)(t.h3,{id:"publish-as-template",children:"Publish as Template"}),"\n",(0,o.jsxs)(t.p,{children:["If you're happy with your flow, publish it as a template for others to use. On ",(0,o.jsx)(t.a,{href:"https://studio.agentok.ai/flows",children:"Workflow"})," page you can find your Workflow to publish:"]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"flows",src:n(3284).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsxs)(t.p,{children:["hit the ",(0,o.jsx)(t.strong,{children:"Publish as Template"})," button at the bottom right of the Workflow card:"]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"publish",src:n(3279).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsxs)(t.p,{children:["And then you can find your template on ",(0,o.jsx)(t.a,{href:"https://studio.agentok.ai/templates",children:"Template"})," page:"]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"template",src:n(4770).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsx)(t.p,{children:"By clicking on the template card, you can view the details of the template:"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"template",src:n(4770).A+"",width:"2446",height:"1956"})}),"\n",(0,o.jsxs)(t.p,{children:["The URL of template page is static and public, so you can share it with others to start a chat directly. You can also click the ",(0,o.jsx)(t.strong,{children:"Fork"})," button to build your own Workflow based on this template."]}),"\n",(0,o.jsx)(t.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,o.jsx)(t.p,{children:"This tutorial provided a concise overview, analogous to an introductory ChatGPT session. The dialog exchange was streamlined \u2013 a single interaction cycle swiftly delivers the intended message, concluding the UserProxyAgent demonstration effectively."}),"\n",(0,o.jsx)(t.p,{children:"Looking ahead, we plan to enhance the functionality, introducing additional features to enrich the user experience. Stay tuned for further developments!"}),"\n",(0,o.jsx)(t.h2,{id:"more-readings",children:"More Readings"}),"\n",(0,o.jsx)(t.p,{children:"Got a taste for Agentok Studio? Feast on these resources for seconds:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://studio.agentok.ai/templates/",children:"Agentok Studio Template"}),": Feast your eyes on a buffet of ready-to-serve templates."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://agentok.ai/",children:"Agentok Studio Documentation"}),": The ultimate guide to becoming a Agentok Studio whiz."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://github.com/hughlv/agentok",children:"Agentok Studio GitHub"}),": Peek under the hood at the source code."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://microsoft.github.io/autogen/",children:"AutoGen Documentation"}),": Master the art of AutoGen with this comprehensive tutorial."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://github.com/microsoft/autogen/tree/main/notebook",children:"AutoGen Notebook"}),": Dive into Jupyter notebooks showcasing AutoGen's prowess."]}),"\n"]})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},266:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/chat-c3b7ff66d244973287e1fd6afcc88400.png"},3284:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/flow-82312b22ad09575ad452a8f1acfef22f.png"},3717:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/login-c46ca6542bd095ce8ac5cd280c0d7775.png"},8812:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/node-843cc3069b2a8ab0aa195eb6d57d2c13.png"},3279:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/publish-as-template-dfcdf8fbb3d4ae683b8c26caabc3cc27.png"},9542:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/python-f6582ad952b924bd52a27516eebe8f8a.png"},4770:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/template-6a4a3794e13dd6a339b84160468c9171.png"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var o=n(6540);const s={},i=o.createContext(s);function a(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);