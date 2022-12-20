import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Paper, TextInput , Button , Text , Group } from "@mantine/core";
import { use, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
const API_KEY = "d57062ab49fda1c978453c764c6d1269";

export default function Home() {

  const [cityInput, setCityInput ] = useState("");
  const [weatherData, setWeatherData] = useState<any>({});
  async function getWeatherData() {
    // api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
    try {
      const serverResponse = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?" + 
        "q=" +
        cityInput +
        "&appid=" +
        API_KEY +
        "&units=metric"
      )
      const data = await serverResponse.json();
      if(data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (err) {
      console.log(err)
    }

  }
  console.log(cityInput);
  return (
    <>
      <Head>
        <title>Weather-app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div        
          style={{
          position:"static",
          height:"100vh",
          backgroundImage:"url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div 
          style={{
            position : "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"


          }}
        >
          <Paper withBorder p="lg" style={{maxWidth: "500px"}}>
            <Group position="apart">
              <Text size="xl" weight={500}>
                Météo
              </Text>
            </Group>
            <Group position="apart" mb="xs">
              <Text size="lg">
                Entre le nom d{"'"}une ville et obtiens la température en temps réel !
              </Text>
              <TextInput
                label="Nom de la ville"
                placeholder='ex: Paris'
                onChange={(e) => setCityInput(e.target.value)}
              />              
            </Group>
            <Group position='apart'>
              <Button variant="gradient" size="md" onClick={() => getWeatherData()}>
                Valider
              </Button>
            </Group>
            {Object.keys(weatherData).length !== 0 ?
              <>
                <Group position='left'>
                  <Text>
                    Météo de {weatherData.name} 
                  </Text>                
                </Group>
                <Group position='left'>
                  <img
                    src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"}
                    width="100px"
                    height="100px"
                  />
                  <Text size="lg" weight={500}>
                    Il fait {weatherData.main.temp} &deg;C
                  </Text>                
                </Group>
              </>
              : null
            }
          </Paper>
        </div>
      </div>
    </>
  )
}
