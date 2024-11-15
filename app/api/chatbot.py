from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

def load_model():
    model_name = "maull04/chatbot_gpt2_healthcaremagic100k"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    
    # Menambahkan pad_token jika tidak ada
    if tokenizer.pad_token is None:
        tokenizer.add_special_tokens({'pad_token': '[PAD]'})
        model.resize_token_embeddings(len(tokenizer))

    text_gen_pipeline = pipeline("text-generation", model=model, tokenizer=tokenizer, device=0)
    return text_gen_pipeline

text_gen_pipeline = load_model()

def chatbotResponse(prompt):
    formatted_prompt = (
      "Instruction: If you are a doctor, please answer the medical questions based on the patient's description.\n"
      f"Input: {prompt}\nResponse:"
    )
    response = text_gen_pipeline(formatted_prompt, max_length=512, do_sample=True, num_return_sequences=1, truncation=False)
    generated_text = response[0]['generated_text'].split("Response:")[-1].strip()

    return generated_text