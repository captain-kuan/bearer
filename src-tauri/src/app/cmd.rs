use anyhow;
use tauri::{command, Window};
// https://tauri.app/v1/guides/features/command/#complete-example
use serde_json::{json, Value};

#[derive(serde::Serialize)]
pub struct RespData<T: serde::Serialize> {
    data: T,
    status: &'static str,
}

pub fn resp_data<T: serde::Serialize>(data: T) -> RespData<T> {
    RespData {
        data,
        status: "Success",
    }
}

pub type Result<F, E = anyhow::Error> = anyhow::Result<F, E>;

#[command]
pub async fn call(
    window: Window,
    url: String,
    params: Value,
    progress: Option<String>, // originally we use on_progress_id, but it seems that tauri doesn't support this format, always None
) -> std::result::Result<Value, String> {
    Ok(json!(resp_data({
        _call(window, url, params, progress)
            .await
            .map_err(|x| x.to_string())?
    })))
}

#[derive(serde::Serialize)]
struct ChatMessage {}

async fn _call(
    window: Window,
    url: String,
    params: Value,
    progress: Option<String>,
) -> Result<Value> {
    let func = if let Some(id) = progress {
        Some(move |data: ChatMessage| {
            let data = serde_json::to_string(&data).unwrap_or_default();
            let val = format!("window['on_progress']['{id}']({{event:{data}}})");
            window.eval(&val).ok();
        })
    } else {
        None
    };
    Ok(match url.as_ref() {
        "/api/verify" | _ => json!({"list":""}),
    })
}

#[command]
pub fn set(key: String, value: String) {
    log::debug!("Set {}={}", key, value);
    std::env::set_var(key, value);
}

#[command]
pub fn get(key: String) -> String {
    std::env::var(key).unwrap_or_default()
}

#[command]
pub async fn fetch(url: String) -> std::result::Result<String, String> {
    // Ok(shared::network::fetch(&url)
    //     .await
    //     .map_err(|x| x.to_string())?)
    Ok("".to_owned())
}
