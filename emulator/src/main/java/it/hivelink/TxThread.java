package it.hivelink;

class TxThread extends Thread {
    private Thread t;
    private final Emulator emulator;
    public boolean stopFlag = false;

    TxThread(Emulator e) {
        emulator = e;
    }

    public void run() {
        while(!stopFlag){
            emulator.loop();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void start () {
        if (t == null) {
            t = new Thread (this, "txThread");
            t.start ();
        }
    }
}
