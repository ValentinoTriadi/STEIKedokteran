from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from deep_translator import GoogleTranslator

def load_model():
    model_name = "maull04/biogpt_finetuning"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    
    # Menambahkan pad_token jika tidak ada
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    text_gen_pipeline = pipeline("text-generation", model=model, tokenizer=tokenizer, device=0)
    return text_gen_pipeline

text_gen_pipeline = load_model()

entranslator = GoogleTranslator(source='auto', target='en')
idtranslator = GoogleTranslator(source='auto', target='id')

def chatbotResponse(prompt):
    # Translate the prompt to English
    
    prompt = entranslator.translate(prompt)

    formatted_prompt = (
      "Instruction: If you are a doctor, please answer the medical questions based on the patient's description.\n"
      f"Input: {prompt}\nResponse:"
    )
    response = text_gen_pipeline(formatted_prompt, max_length=256, do_sample=True, num_return_sequences=1, truncation=True)
    generated_text = response[0]['generated_text'].split("Response:")[-1].strip()

    generated_text = idtranslator.translate(generated_text)

    return generated_text