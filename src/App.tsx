import { useState, useEffect } from 'react';
import { Converter } from 'opencc-js';

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // 创建转换器实例
  const t2sConverter = Converter({ from: 'hk', to: 'cn' }); // 繁体转简体
  const s2tConverter = Converter({ from: 'cn', to: 'hk' }); // 简体转繁体

  const handleConvert = (direction: 'simplified' | 'traditional') => {
    if (!inputText.trim()) {
      setStatus('请输入要转换的文本');
      setStatusType('error');
      setTimeout(() => {
        setStatus('');
        setStatusType('');
      }, 3000);
      return;
    }

    setIsLoading(true);
    setStatus('转换中...');
    setStatusType('');

    // 模拟转换过程
    setTimeout(() => {
      try {
        console.log('开始转换，方向:', direction);
        console.log('输入文本:', inputText);
        let result: string;
        if (direction === 'simplified') {
          console.log('调用 t2sConverter 函数（繁体转简体）');
          result = t2sConverter(inputText);
          console.log('转换结果:', result);
          setOutputText(result);
          setStatus('转换成功：繁体转简体');
        } else {
          console.log('调用 s2tConverter 函数（简体转繁体）');
          result = s2tConverter(inputText);
          console.log('转换结果:', result);
          setOutputText(result);
          setStatus('转换成功：简体转繁体');
        }
        setStatusType('success');
      } catch (error) {
        console.error('转换错误:', error);
        setStatus('转换失败，请重试');
        setStatusType('error');
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setStatus('');
          setStatusType('');
        }, 3000);
      }
    }, 500);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setStatus('');
    setStatusType('');
  };

  const handleCopy = () => {
    if (!outputText) {
      setStatus('没有可复制的内容');
      setStatusType('error');
      setTimeout(() => {
        setStatus('');
        setStatusType('');
      }, 3000);
      return;
    }

    navigator.clipboard.writeText(outputText).then(() => {
      setStatus('复制成功');
      setStatusType('success');
      setTimeout(() => {
        setStatus('');
        setStatusType('');
      }, 3000);
    }).catch(() => {
      setStatus('复制失败，请手动复制');
      setStatusType('error');
      setTimeout(() => {
        setStatus('');
        setStatusType('');
      }, 3000);
    });
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  useEffect(() => {
    // 添加页面加载动画
    document.body.classList.add('fade-in');
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-icon">中</div>
            简繁转换器
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">首页</a>
            <a href="#converter" className="nav-link">转换器</a>
            <a href="#features" className="nav-link">功能</a>
            <a href="#about" className="nav-link">关于</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">在线简繁转换器</h1>
            <p className="hero-subtitle">
              快速准确的中文简繁体转换工具，支持批量转换，免费使用
            </p>
          </div>
        </section>

        <section id="converter" className="container">
          <div className="converter">
            <div className="converter-header">
              <h2 className="converter-title">中文简繁转换</h2>
              <p className="converter-description">
                输入文本，选择转换方向，点击转换按钮即可
              </p>
            </div>

            {status && (
              <div className={`status status-${statusType}`}>
                {isLoading ? (
                  <div className="loading"></div>
                ) : (
                  status
                )}
              </div>
            )}

            <div className="converter-content">
              <div className="input-section">
                <div className="section-header">
                  <h3 className="section-title">输入文本</h3>
                  <span className="char-count">{inputText.length} 字符</span>
                </div>
                <textarea
                  className="textarea"
                  placeholder="请输入要转换的文本..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
              </div>

              <div className="output-section">
                <div className="section-header">
                  <h3 className="section-title">转换结果</h3>
                  <span className="char-count">{outputText.length} 字符</span>
                </div>
                <textarea
                  className="textarea"
                  placeholder="转换结果将显示在这里..."
                  value={outputText}
                  readOnly
                ></textarea>
              </div>
            </div>

            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => handleConvert('simplified')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading"></div>
                ) : (
                  <>繁体转简体</>
                )}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleConvert('traditional')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading"></div>
                ) : (
                  <>简体转繁体</>
                )}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleSwap}
                disabled={isLoading}
              >
                交换
              </button>
              <button
                className="btn btn-outline"
                onClick={handleCopy}
                disabled={isLoading || !outputText}
              >
                复制结果
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClear}
                disabled={isLoading}
              >
                清空
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="container">
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">快速转换</h3>
              <p className="feature-description">
                实时转换，秒级响应，无需等待
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">准确可靠</h3>
              <p className="feature-description">
                专业的转换算法，确保转换结果准确无误
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">响应式设计</h3>
              <p className="feature-description">
                适配各种设备，随时随地使用
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">隐私保护</h3>
              <p className="feature-description">
                本地转换，数据不经过服务器，保护您的隐私
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>关于我们</h3>
              <p>在线简繁转换器是一个免费的中文简繁体转换工具，致力于为用户提供快速、准确的转换服务。</p>
            </div>
            <div className="footer-section">
              <h3>功能</h3>
              <p><a href="#converter">简繁转换</a></p>
              <p><a href="#">批量转换</a></p>
              <p><a href="#">API 接口</a></p>
            </div>
            <div className="footer-section">
              <h3>资源</h3>
              <p><a href="#">使用指南</a></p>
              <p><a href="#">常见问题</a></p>
              <p><a href="#">隐私政策</a></p>
            </div>
            <div className="footer-section">
              <h3>联系我们</h3>
              <p>邮箱：contact@example.com</p>
              <p>微信：ChineseConverter</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 在线简繁转换器 - 保留所有权利</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;