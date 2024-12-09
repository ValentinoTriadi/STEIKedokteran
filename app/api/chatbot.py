import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load model and tokenizer
def load_model():
    model_name = 'sail/Sailor2-1B-Chat'  # Use the correct model name
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.bfloat16,
        device_map="auto"  # Map the model to GPU automatically
    )
    
    # Add pad_token if not present
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    return model, tokenizer

# Initialize model and tokenizer
model, tokenizer = load_model()

# Define system prompt
system_prompt = (
    "You are an AI assistant specialized in medical consultations, created to provide information "
    "and guidance in Southeast Asian languages including Indonesian. Your responses must be "
    "friendly, detailed, and accurate while staying professional and unbiased."
)

# Generate chatbot response
def chatbotResponse(user_input, max_tokens=1024):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    # Format the conversation with the system prompt
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_input}
    ]
    
    # Apply the chat template
    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    
    # Prepare input for the model with truncation=False
    model_inputs = tokenizer([text], return_tensors="pt", truncation=False).to(device)
    input_ids = model_inputs.input_ids.to(device)
    
# Generate response
    generated_ids = model.generate(
        input_ids,
        max_new_tokens=max_tokens,
        no_repeat_ngram_size=2,  # Prevent repetitive phrases
        repetition_penalty=1.2,  # Penalize repetitive sequences
        eos_token_id=tokenizer.eos_token_id,  # Ensure proper ending
        pad_token_id=tokenizer.pad_token_id,  # Use pad token for padding
        truncation=False  # Ensure output isn't truncated
    )

    
    # Post-process the generated tokens
    generated_ids = [
        output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]
    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
    return response
