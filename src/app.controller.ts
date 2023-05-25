import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { OpenAIApi, Configuration } from 'openai';
import { AppService } from './app.service';


@Controller()
export class AppController {
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.openAiApiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Post('/check')
  async check(@Body() requestBody: {prompt: string }): Promise<any> {
    try {
      
      // const response = await this.openai.createCompletion({
      //   model: 'text-davinci-003',
      //   prompt: 'Correct the grammatical error and give an explanation:${requestBody.prompt}',
      //   temperature: 0,
      //   max_tokens: 100,
      //   top_p: 1.0,
      //   frequency_penalty: 0.0,
      //   presence_penalty: 0.0,
      // });
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        // prompt: "Correct this to standard English:\n\nRabin go to the offiec.",
        prompt: `Correct the grammatical error and give an explanation:${requestBody.prompt}`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      response.data.choices[0];
      
      return {
        Corrected_grammar: response.data.choices[0].text,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
