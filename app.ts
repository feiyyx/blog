// app.ts
import { Application, IBoot } from 'egg';

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async willReady() {
    const res = this.app.model.Articles.findAll();
    // All plugins have started, can do some thing before app ready.
    console.log('testesttest', res)
    console.log('testesttest')
    console.log('testesttest')
    console.log('testesttest')
    console.log('testesttest')
    console.log('testesttest')
    console.log('testesttest')
  }
//   async didReady() {
//     // Worker is ready, can do some things
//     // don't need to block the app boot.
//     console.log('testesttest', )
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//   }

//   async serverDidReady() {
//     // Server is listening.
//     console.log('testesttest', this.app.model)
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//     console.log('testesttest')
//   }
}