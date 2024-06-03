---
title: My experience using Svelte
author: Nicholas Ficara
date: 2021-04-20
tags: 
  - Svelte
  - Firebase
---

A few weeks ago I started building a web app to anonymously connect students with trained peers. The project needed to be on a small budget (aka free). Most of the stuff I build is on a similar budget, and by that I mean the exact same budget. This is good in some ways. It teaches me to be resourceful and use the free tools at my disposal and work around the old school way of hosting a MySQL server (which I have done 😢). I decided to build a static website that utilizes Firebase. I already had experience with Firebase, and I loved it. In my opinion, the best way to build a serverless application is Firebase. It's incredibly well built and intuitive. Additionally, it's compatible with any stack you can imagine. It *genuinely* made building the app fun. No fancy queries, no ugly code, just pure ease of use. For example, the plugin for Firebase and Svelte to work together is called SvelteFire. It's incredibly easy to work with. Most of my code was right in the markdown of the site, with multiple levels of asynchronous calls. The amount of abstraction was uncanny and it somehow didn't lead to any problems or shortcomings. In my opinion, it's as close to perfect as you can get with database interaction. For instance, this was the code to display all active chats:

```html
<FirebaseApp {firebase}>
  <User let:user let:auth>
    <Collection 
      path="/users" 
      query={ref => ref.orderBy("timeCreated")}
      let:data={threads}
      let:ref={threadsRef}>

      <Table striped responsive>
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Time Created</th>
            <th>Is Chatting</th>
            <th>Is Finished</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {#each threads as row (row.id)}
            <tr>
              <th scope="row">{row.name ? row.name : "No Name"}</th>
              <td>{row.timeCreated ? row.timeCreated.toDate().toLocaleString() : "..."}</td>
              <td>{row.isChatting ? "✅" : "❌"}</td>
              <td>{row.isFinished ? "✅" : "❌"}</td>
              <td><a href="#/chat/1/{row.id}">Link</a></td>
            </tr>
          {/each}
        </tbody>
      </Table>

    </Collection>
  </User>
</FirebaseApp>
```

All I had to do was open a tag `<FirebaseApp>` with a reference to the Firebase library. Next I used the `<User>` tag which waits for the user to load in and then sets `user` to the current user. After the user is authenticated, I use the `<Collection>` tag which waits for the given collection to load and then gives you the `data` variable to work with. It's incredibly intuitive. 

## Here's the best part

It all compiles to standard javascript. Yes you read that correctly. All of this insanely abstracted and fancy code compiles right down to javascript. There is no overhead library like React that has to be loaded in. Svelte is more of a compiler than a javascript framework, and I love it. This strategy allows for easy implementation as a static website, more reliable outputs, etc. On top of all of this, if you encounter a nasty bug (I haven't) you can go into the compiled javascript and see what went wrong. It's usually decently readable.

## Conclusion

In this project, I learned that I love Svelte. I will be sticking to it in the future over React. Even though it's not as mature as React, and I did have a few issues with the way styles are applied, I think it has serious potential to overtake React. 

