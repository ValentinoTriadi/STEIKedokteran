from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import chatbotResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.post("/chatbot")
async def chatbot(request: Request):
  data = await request.json()
  return chatbotResponse(data['prompt'])

if __name__ == '__main__':
  import uvicorn
  uvicorn.run("main:app", host='localhost', port=8000, reload=True)