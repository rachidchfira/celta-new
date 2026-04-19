'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, PhoneOff, Loader2, Volume2 } from 'lucide-react'

type SessionStatus = 'idle' | 'connecting' | 'connected' | 'error'

interface TranscriptEntry {
  role: 'user' | 'assistant'
  text: string
}

export default function VoiceCoach() {
  const [status, setStatus] = useState<SessionStatus>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const vbRef = useRef<any>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  const connect = async () => {
    setStatus('connecting')
    setErrorMsg('')
    setTranscript([])
    try {
      const { VocalBridge } = await import('@vocalbridgeai/sdk')
      const vb = new VocalBridge({
        auth: { tokenUrl: '/api/voice-token' },
        participantName: 'CELTA Prep Student',
      })

      vb.on('connectionStateChanged', (state: any) => {
        if (state === 'connected' || state === 1) {
          setStatus('connected')
        } else if (state === 'disconnected' || state === 0) {
          setStatus('idle')
        }
      })

      vb.on('transcript', (entry: TranscriptEntry) => {
        setTranscript(prev => [...prev, entry])
      })

      vb.on('agentStartedSpeaking', () => setIsAISpeaking(true))
      vb.on('agentStoppedSpeaking', () => setIsAISpeaking(false))

      vb.on('error', (err: any) => {
        setStatus('error')
        setErrorMsg(err?.message || 'Connection error. Please try again.')
      })

      await vb.connect()
      vbRef.current = vb
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err?.message || 'Failed to connect. Please try again.')
    }
  }

  const disconnect = () => {
    vbRef.current?.disconnect()
    vbRef.current = null
    setStatus('idle')
    setIsAISpeaking(false)
  }

  const toggleMute = () => {
    vbRef.current?.toggleMicrophone()
    setIsMuted(prev => !prev)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Status orb + controls */}
      <div className="flex flex-col items-center gap-6 mb-8">
        {/* Animated orb */}
        <div className="relative flex items-center justify-center">
          {status === 'connected' && (
            <>
              <span
                className="absolute rounded-full opacity-20 animate-ping"
                style={{
                  width: 96,
                  height: 96,
                  background: isAISpeaking
                    ? 'radial-gradient(circle, #b85c38, #c9a84c)'
                    : 'radial-gradient(circle, #c9a84c, #b85c38)',
                }}
              />
              <span
                className="absolute rounded-full opacity-10"
                style={{
                  width: 120,
                  height: 120,
                  background: 'radial-gradient(circle, #c9a84c, transparent)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
            </>
          )}
          <div
            className="relative z-10 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              width: 80,
              height: 80,
              background:
                status === 'connected'
                  ? isAISpeaking
                    ? 'linear-gradient(135deg, #b85c38, #c9a84c)'
                    : 'linear-gradient(135deg, #c9a84c, #b85c38)'
                  : status === 'connecting'
                  ? 'linear-gradient(135deg, #6b6560, #a09890)'
                  : status === 'error'
                  ? 'linear-gradient(135deg, #c0392b, #e74c3c)'
                  : 'linear-gradient(135deg, #c9a84c, #b85c38)',
              boxShadow:
                status === 'connected'
                  ? '0 0 32px rgba(201, 168, 76, 0.4)'
                  : '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            {status === 'connecting' ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : status === 'connected' ? (
              isAISpeaking ? (
                <Volume2 className="w-8 h-8 text-white" />
              ) : isMuted ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        {/* Status label */}
        <div className="text-center">
          {status === 'idle' && (
            <p className="font-body text-sm text-[#6b6560]">Ready to start your session</p>
          )}
          {status === 'connecting' && (
            <p className="font-body text-sm text-[#a09890] animate-pulse">Connecting to your coach...</p>
          )}
          {status === 'connected' && (
            <p className="font-body text-sm font-semibold" style={{ color: '#c9a84c' }}>
              {isAISpeaking ? 'Coach is speaking...' : isMuted ? 'Microphone muted' : 'Listening — speak now'}
            </p>
          )}
          {status === 'error' && (
            <p className="font-body text-sm text-red-600">{errorMsg}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {status === 'idle' || status === 'error' ? (
            <button
              onClick={connect}
              className="flex items-center gap-2 font-body font-semibold px-7 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #b85c38)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(201, 168, 76, 0.35)',
              }}
            >
              <Mic className="w-4 h-4" />
              Start Practice Session
            </button>
          ) : status === 'connecting' ? (
            <button
              disabled
              className="flex items-center gap-2 font-body font-semibold px-7 py-3 rounded-full opacity-60 cursor-not-allowed"
              style={{ background: '#d4cdc0', color: '#6b6560' }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting...
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className="flex items-center gap-2 font-body font-semibold px-5 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: isMuted ? '#0e0c0a' : '#e8e0d0',
                  color: isMuted ? '#f5f0e8' : '#0e0c0a',
                }}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 font-body font-semibold px-5 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: '#fee2e2', color: '#b91c1c' }}
              >
                <PhoneOff className="w-4 h-4" />
                End Session
              </button>
            </>
          )}
        </div>
      </div>

      {/* Transcript */}
      <div
        className="rounded-2xl p-5 min-h-[200px] max-h-[320px] overflow-y-auto"
        style={{ background: '#f5f0e8', border: '1px solid #d4cdc0' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ background: '#c9a84c' }} />
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-[#6b6560]">
            Transcript
          </span>
        </div>

        {transcript.length === 0 ? (
          <p className="font-body text-sm italic text-[#a09890]">
            Your conversation will appear here once you start a session...
          </p>
        ) : (
          <div className="space-y-3">
            {transcript.map((entry, i) => (
              <div
                key={i}
                className={`flex gap-3 ${entry.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={
                    entry.role === 'user'
                      ? { background: '#c9a84c', color: '#fff' }
                      : { background: '#0e0c0a', color: '#f5f0e8' }
                  }
                >
                  {entry.role === 'user' ? 'Y' : 'C'}
                </div>
                <div
                  className="rounded-xl px-4 py-2 max-w-[80%]"
                  style={
                    entry.role === 'user'
                      ? { background: '#c9a84c', color: '#0e0c0a' }
                      : { background: '#fff', color: '#0e0c0a', border: '1px solid #d4cdc0' }
                  }
                >
                  <p className="font-body text-sm leading-relaxed">{entry.text}</p>
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </div>
    </div>
  )
}
