import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo">
            Provador<span>Virtual</span>
          </a>
          <nav className="nav-links">
            <a href="#como-funciona">Como funciona</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#contato" className="btn btn-primary btn-nav">
              Pedir demonstração
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <span className="hero-badge">✨ Inteligência artificial para moda</span>
            <h1>
              Seus clientes <em>experimentam antes</em> de comprar
            </h1>
            <p>
              O Provador Virtual usa IA para mostrar como cada peça fica no corpo do
              cliente — direto do site ou do WhatsApp da sua loja. Menos trocas,
              mais confiança e mais vendas.
            </p>
            <a href="#contato" className="btn btn-primary">
              Quero ver na minha loja
            </a>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>+30%</strong>
                <span>de conversão nas vendas online</span>
              </div>
              <div className="hero-stat">
                <strong>-40%</strong>
                <span>em trocas e devoluções</span>
              </div>
              <div className="hero-stat">
                <strong>2 min</strong>
                <span>para o cliente se ver com a roupa</span>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <h2>Como funciona</h2>
              <p>Três passos simples — sem app para instalar, sem cadastro complicado.</p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Cliente envia uma foto</h3>
                <p>
                  Pelo site ou pelo WhatsApp da loja, o cliente envia uma foto de corpo
                  inteiro. É rápido e seguro.
                </p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Escolhe as peças</h3>
                <p>
                  Ele navega pelo catálogo da sua loja e seleciona as roupas que quer
                  experimentar virtualmente.
                </p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>A IA veste na hora</h3>
                <p>
                  Em segundos, a inteligência artificial gera a imagem do cliente vestindo
                  a peça — pronto para decidir a compra.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Por que sua loja precisa do Provador Virtual</h2>
              <p>Tecnologia que já é padrão nas grandes varejistas, agora acessível para a sua loja.</p>
            </div>
            <div className="features">
              <div className="feature">
                <div className="feature-icon">🛍️</div>
                <h3>Mais vendas</h3>
                <p>
                  Clientes que se veem com a roupa compram com muito mais confiança e
                  abandonam menos o carrinho.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">🔄</div>
                <h3>Menos trocas</h3>
                <p>
                  Expectativa alinhada com a realidade significa menos devoluções e menos
                  custo logístico.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">💬</div>
                <h3>Integrado ao WhatsApp</h3>
                <p>
                  Funciona no canal que seu cliente já usa todos os dias — sem precisar
                  baixar nada.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Resultado em segundos</h3>
                <p>
                  A imagem é gerada na hora, mantendo o cliente engajado no momento da
                  decisão de compra.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">📈</div>
                <h3>Dados dos clientes</h3>
                <p>
                  Descubra quais peças são mais experimentadas e use isso para planejar
                  coleção e estoque.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <h3>Privacidade em primeiro lugar</h3>
                <p>
                  As fotos dos clientes são tratadas com segurança e usadas apenas para a
                  experiência de prova.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <h2>Peça uma demonstração</h2>
              <p>
                Preencha o formulário e nossa equipe entra em contato por e-mail ou
                WhatsApp para mostrar o Provador Virtual funcionando com as peças da sua
                loja.
              </p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Provador Virtual · Uma solução{" "}
            <a href="https://quipeai.com.br" target="_blank" rel="noopener noreferrer">
              QuipeAI
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
