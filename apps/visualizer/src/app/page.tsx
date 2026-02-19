          <div
            className="relative w-full max-w-6xl min-h-[600px] border rounded-lg p-6"
            style={{ backgroundColor: '#13162980', borderColor: '#00f0ff10', backdropFilter: 'blur(4px)' }}
          >
            <div className="absolute -top-3 left-4 px-2 pixel-text" style={{ fontSize: '8px', color: '#6a6a8a', backgroundColor: '#131629' }}>
              ▸ OPERATIONS FLOOR — DECK 7
            </div>

            {/* Office furniture */}
            <Window top="8%" left="3%" width={50} />
            <Window top="25%" left="3%" width={50} />
            <ServerRack top="6%" right="5%" />
            <CoffeeStation top="70%" right="8%" />
            <PottedPlant top="45%" left="10%" size="large" />
            <PottedPlant top="20%" left="25%" size="small" />
            <PottedPlant top="75%" left="18%" size="small" />
            <PottedPlant top="15%" right="20%" size="large" />

            {/* Office grid layout - 4x2 grid with equal spacing */}
            <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-12">
              {/* Row 1 */}
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Volt')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Volt')!} variant="volt" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Blink')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Blink')!} variant="command" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Pixel')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Pixel')!} variant="pixel" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Scout')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Scout')!} variant="scout" />
              </div>

              {/* Row 2 */}
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Spark')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Spark')!} variant="spark" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Echo')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Echo')!} variant="echo" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Cipher')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Cipher')!} variant="cipher" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Atlas')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Atlas')!} variant="atlas" />
              </div>
            </div>

            {/* Floor marker */}
            <div className="absolute bottom-4 left-4 pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
              ██████▓▓▓██████▓▓▓██████
            </div>
          </div>